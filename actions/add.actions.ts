import { AbstractAction } from ".";
import { Input } from "../commands";
import { installProject, installScreens } from "../lib/install/install";
import {
  askForMissingInformation,
  generateAnswerToInput,
} from "../lib/questions/questions";

export class AddAction extends AbstractAction {
  public async handle(
    inputs?: Input[] | undefined,
    options?: Input[] | undefined,
    extraFlags?: string[] | undefined
  ): Promise<void> {
    const schematic = inputs?.find(
      (o: Input) => o.name === "schematic" && o.value
    );
    const name = inputs?.some((o: Input) => o.name === "name" && o.value);
    if (!name) {
      let questions = [
        {
          name: "name",
          value:
            schematic?.value === "mi" || schematic?.value === "micro"
              ? "Tên project Micro"
              : "Tên screens",
          options: [{ name: "type", value: "input" }],
        },
      ];
      const answers = await askForMissingInformation(questions);
      inputs = generateAnswerToInput(answers);
    }
    if (schematic?.value === "mi" || schematic?.value === "micro") {
      const port = options?.some((o: Input) => o.name === "port" && o.value);
      let _option =
        options?.filter((o: Input) => o.name !== "skip-router") || [];

      if (!port) {
        let questions = [
          {
            name: "port",
            value: "PORT:",
            options: [{ name: "type", value: "input" }],
          },
        ];
        const answers = await askForMissingInformation(questions);
        const _port = generateAnswerToInput(answers);
        _option = [..._option, ..._port];
      }
      const name = inputs?.find((o: Input) => o.name === "name");

      const skipRouter = options?.some(
        (option: Input) =>
          option.name === "skip-router" && option.value === true
      );
      if (!skipRouter) {
        _option?.push({ name: "add-router", value: true });
      }
      await installProject(
        [
          {
            name: "micro",
            value: name?.value || "",
            options: _option,
          },
        ],
        options
      );
    } else {
      const name = inputs?.find((o: Input) => o.name === "name");

      await installScreens(
        [{ name: "screens", value: name?.value || "", options: options }],
        options
      );
    }
    process.exit(0);
  }
}
