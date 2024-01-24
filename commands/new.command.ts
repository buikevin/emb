import { Command } from "commander";
import { AbstractCommand } from "./abstract.command";
import { Input } from "./command.input";

export class NewCommand extends AbstractCommand {
  public load(program: Command): void {
    program
      .command("new [name]")
      .alias("n")
      .description("Tạo mới 1 project micro frontend.")
      // .option("-o, --option", "Tuỳ chọn trước khi tạo project.", false)
      // .option("-t, --template", "Chọn kiểu project.")
      .option("-skip, --skip-install", "Bỏ qua cài đặt thư viện.", false)
      .action(
        async (
          name: string,
          command: {
            // option: boolean;
            skipInstall: boolean;
            // template: "micro-frontend" | "spa" | "ssr";
          }
        ) => {
          console.log(name, command, "kkkk");
          const options: Input[] = [];
          // options.push({ name: "option", value: command.option });
          options.push({ name: "skip-install", value: command.skipInstall });
          // options.push({ name: "template", value: command.template });
          const inputs: Input[] = [];
          inputs.push({ name: "name", value: name });
          await this.action.handle(inputs, options);
        }
      );
  }
}
