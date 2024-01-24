/**
 * @author hieubt
 * @email [hieubt2@msb.com.vn]
 * @create date 23/01/2024
 * @modify date 23/01/2024
 * @desc [description]
 */
import { Input } from "../../commands";
import { EMOJIS, MESSAGES } from "../ui";
import * as shelljs from "shelljs";
import {
  copyFileSync,
  cpSync,
  existsSync,
  lstatSync,
  readFileSync,
  readdirSync,
  renameSync,
  writeFileSync,
} from "fs";
import { compareList } from "../utils/local-binaries";
import * as ora from "ora";
const path = require("path");

const isYarn = shelljs.which("yarn");

export const installProject = async (input?: Input[], option?: Input[]) => {
  console.info(MESSAGES.PROJECT_INFORMATION_START);
  let nameFolder = compareList(input)?.find(
    (val: Input) => val.name == "name"
  )?.value;
  if (typeof nameFolder === "string") {
    shelljs.mkdir("-p", nameFolder);
    shelljs.cd(nameFolder);
  } else {
    nameFolder = process.cwd().split("/").pop();
  }
  const listMicro = input?.filter((val: Input) => val.name === "micro") || [];
  await Promise.all(
    listMicro.map(async (value) => {
      await addProject(value, nameFolder as string);
    })
  );
  return null;
};

export const addProject = async (input: Input, nameFolder?: string) => {
  const skippInstall = input.options?.some(
    (value: Input) => value.name === "skip-install" && value.value
  );
  const spinner = ora({
    text: `${EMOJIS.COFFEE}  Khởi tạo micro service ${input.value} ${
      !skippInstall ? "và cài đặt package" : ""
    } `,
  });
  console.info();
  spinner.start();
  console.info();
  const checkTemplate = existsSync(
    path.join(__dirname, `../../../template/template-${input.value}`)
  );
  const nameRouter = `${nameFolder}-${input.value}`;
  shelljs.mkdir("-p", nameRouter);
  shelljs.cd(nameRouter);
  cpSync(
    path.join(
      __dirname,
      `../../../template/template-${checkTemplate ? input.value : "base"}`
    ),
    path.join(process.cwd()),
    { recursive: true }
  );
  if (!skippInstall) {
    if (isYarn) {
      await shelljs.exec("yarn");
    } else {
      await shelljs.exec("npm install");
    }
  }
  if (!checkTemplate) {
    renameProject(process.cwd(), input);
  }
  shelljs.cd("../");
  const skippAddRouter = input.options?.some(
    (value: Input) => value.name === "skip-router" && value.value
  );
  if (!skippAddRouter) {
  }
  spinner.stop();
};

export const installScreens = async (input?: Input[], option?: Input[]) => {
  console.info(MESSAGES.PROJECT_INFORMATION_START);
  let nameFolder = process.cwd().split("/").pop();
  const listMicro = input?.filter((val: Input) => val.name === "screens") || [];
  await Promise.all(
    listMicro.map(async (value) => {
      await renameProject(process.cwd(), value);
    })
  );
  return null;
};

export const renameProject = async (_path: string, input: Input) => {
  try {
    /**
     * Đổi tên folder từ base về name đăng ký
     */
    if (!existsSync(path.join(_path, "./src/pages/__base"))) {
      await cpSync(
        path.join(__dirname, `../../../template/template-base/src/__base}`),
        path.join(_path, "./src/pages/__base"),
        { recursive: true }
      );
    }
    await renameSync(
      path.join(_path, "./src/pages/__base"),
      path.join(_path, `./src/pages/${input.value}`)
    );
  } catch (err) {
    console.log(err);
  }
  [];
  /**
   * Đọc danh sách file/folder trong pages
   */
  const list = await readdirSync(
    path.join(_path, `./src/pages/${input.value}`),
    {
      encoding: "utf-8",
    }
  );
  /**
   * Chuyển từ tên folder base về tên name
   */
  Promise.all(
    list.map(async (value: string) => {
      const name = input.value as string;
      try {
        if (
          lstatSync(path.join(_path, `./src/pages/${name}/${value}`)).isFile()
        ) {
          let readFilePage = await readFileSync(
            path.join(_path, `./src/pages/${name}/${value}`),
            "utf-8"
          );
          readFilePage = replaceBase(readFilePage, name);
          await writeFileSync(
            path.join(_path, `./src/pages/${name}/${value}`),
            readFilePage
          );
          await renameSync(
            path.join(_path, `./src/pages/${name}/${value}`),
            path.join(
              _path,
              `./src/pages/${name}/${value.replaceAll("__base", name)}`
            )
          );
        }
        if (value === "container") {
          let readFileDetailPage = await readFileSync(
            path.join(_path, `./src/pages/${name}/container/detail/index.tsx`),
            "utf-8"
          );
          readFileDetailPage = replaceBase(readFileDetailPage, name);
          await writeFileSync(
            path.join(_path, `./src/pages/${name}/container/detail/index.tsx`),
            readFileDetailPage
          );

          let readFileListPage = readFileSync(
            path.join(_path, `./src/pages/${name}/container/list/index.tsx`),
            "utf-8"
          );

          readFileListPage = replaceBase(readFileListPage, name);
          writeFileSync(
            path.join(_path, `./src/pages/${name}/container/list/index.tsx`),
            readFileListPage
          );
        }
      } catch (error) {
        console.log(error, "Cha nhe loi o day?");
      }
    })
  );

  /**
   *copy và đổi tên locales
   */
  Promise.all(
    ["vi", "en"].map(async (value: string) => {
      try {
        /**
         * Kiểm tra locales đã có file base.json chưa? nếu chưa thì copy còn nêu tồn tại thì đổi tên
         */
        if (
          existsSync(path.join(_path, `./public/locales/${value}/__base.json`))
        ) {
          renameSync(
            path.join(_path, `./public/locales/${value}/__base.json`),
            path.join(_path, `./public/locales/${value}/${input.value}.json`)
          );
        } else {
          await copyFileSync(
            path.join(
              __dirname,
              `../../../template/template-base/public/locales/${value}/__base.json`
            ),
            path.join(_path, `./public/locales/${value}/${input.value}.json`)
          );
        }
      } catch (error) {
        console.info(error, "11111");
      }
    })
  );
  /**
   * Đăng ký locales
   */
  try {
    const readI18n = await readFileSync(
      path.join(_path, `./src/locales/i18n.ts`),
      "utf-8"
    );
    if (readI18n) {
      const _read = readI18n.split("\n");
      const _findNameTransationFile = _read.findIndex((value: string) =>
        value.includes("TranslationFile")
      );
      _read.splice(
        _findNameTransationFile + 1,
        0,
        `  ${(input.value as string).replaceAll("-", "_").toUpperCase()}: "${
          input.value
        }"`
      );
      await writeFileSync(
        path.join(_path, `./src/locales/i18n.ts`),
        _read.join("\n")
      );
    }
  } catch (error) {
    console.info(error, "22222");
  }
  /**
   * Đăng ký router
   */
  try {
    if (existsSync(path.join(_path, `./src/routers/router.tsx`))) {
      let readRouter = readFileSync(
        path.join(_path, `./src/routers/router.tsx`),
        "utf-8"
      );
      const name = input.value as string;
      if (readRouter.includes("__base") || readRouter.includes("__Base")) {
        readRouter = replaceBase(readRouter, name);
      } else {
        const _readRouter = readRouter.split("\n");
        const _findNRouter = _readRouter.findIndex((value: string) =>
          value.includes("element: <Outlet />,")
        );
        const _findErrorBoundary = _readRouter.findIndex((value: string) =>
          value.includes("const ErrorBoundary")
        );
        let __template = `      {
        path: "/__base",
        element: (
          <Suspense>
            <__BasePage />
          </Suspense>
        ),
        errorElement: <ErrorBoundary />,
      },`;
        __template = replaceBase(__template, name);
        readRouter = [
          ..._readRouter.slice(0, _findErrorBoundary),
          replaceBase(
            'const __BasePage = lazy(() => import("../pages/__base/index"));',
            name
          ),
          ..._readRouter.slice(_findErrorBoundary + 1, _findNRouter),
          ...__template.split("\n"),
          ..._readRouter.slice(_findNRouter + 1, _readRouter.length),
        ].join("\n");
      }
      writeFileSync(path.join(_path, `./src/routers/router.tsx`), readRouter);
    }
  } catch (error) {
    console.log(error, "errror");
  }
};

const replaceBase = (str: string, name: string) => {
  const _name =
    name.toLowerCase()[0].toUpperCase() + name.substring(1).toLowerCase();
  return str.replaceAll(/__Base/g, _name).replaceAll(/__base/g, name);
};
