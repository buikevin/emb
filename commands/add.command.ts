import { Command } from "commander";
import { AbstractCommand } from "./abstract.command";
import { Input } from "./command.input";
import * as chalk from "chalk";
import * as Table from "cli-table3";
export class AddCommand extends AbstractCommand {
  public async load(program: Command): Promise<void> {
    program
      .command("add <schematic> [name]")
      .description(await this.buildDescription())
      .option("-p, --port", "Thêm port", false)
      .option(
        "-srouter, --skip-router",
        "Không tự động thêm vào micro router.",
        false
      )
      .option("-skip, --skip-install", "Bỏ qua cài đặt thư viện.", false)
      .action(
        async (
          schematic: string,
          name: string,
          command: {
            skipInstall: boolean;
            skipRouter: boolean;
            port: string;
          }
        ) => {
          const options: Input[] = [];
          //   options.push({ name: "option", value: command.option });
          options.push({ name: "skip-install", value: command.skipInstall });
          options.push({ name: "skip-router", value: command.skipRouter });
          options.push({ name: "port", value: command.port });
          //   options.push({ name: "template", value: command.skipRouter });
          const inputs: Input[] = [];
          inputs.push({ name: "schematic", value: schematic });
          inputs.push({ name: "name", value: name });
          await this.action.handle(inputs, options);
        }
      );
  }
  private async buildDescription(): Promise<string> {
    return (
      "Các phương thức thêm mới có thể hỗ trợ:\n" +
      this.buildSchematicsListAsTable()
    );
  }
  private buildSchematicsListAsTable(): string {
    const leftMargin = "    ";
    const tableConfig = {
      head: ["name", "alias", "description"],
      chars: {
        left: leftMargin.concat("│"),
        "top-left": leftMargin.concat("┌"),
        "bottom-left": leftMargin.concat("└"),
        mid: "",
        "left-mid": "",
        "mid-mid": "",
        "right-mid": "",
      },
    };
    const table: any = new Table(tableConfig);
    const schematics: { name: string; alias: string; description: string }[] = [
      {
        name: "micro",
        alias: "mi",
        description: "Thêm mới 1 project Micro",
      },
      {
        name: "screens",
        alias: "scr",
        description: "Thêm mới 1 màn hình vào trong 1 micro",
      },
    ];
    for (const schematic of schematics) {
      table.push([
        chalk.green(schematic.name),
        chalk.cyan(schematic.alias),
        schematic.description,
      ]);
    }
    return table.toString();
  }
}
