import * as chalk from "chalk";
import { Command } from "commander";
import { ERROR_PREFIX } from "../lib/ui";
import { NewAction } from "../actions";
// import { ERROR_PREFIX } from '../lib/ui';
// import { AddCommand } from './add.command';
// import { BuildCommand } from './build.command';
// import { GenerateCommand } from './generate.command';
// import { InfoCommand } from './info.command';
import { NewCommand } from "./new.command";
import { AddCommand } from "./add.command";
import { AddAction } from "../actions/add.actions";
// import { StartCommand } from './start.command';
export class CommandLoader {
  public static async load(program: Command): Promise<void> {
    new NewCommand(new NewAction()).load(program);
    // new BuildCommand(new BuildAction()).load(program);
    // new StartCommand(new StartAction()).load(program);
    // new InfoCommand(new InfoAction()).load(program);
    new AddCommand(new AddAction()).load(program);
    // await new GenerateCommand(new GenerateAction()).load(program);

    this.handleInvalidCommand(program);
  }

  private static handleInvalidCommand(program: Command) {
    program.on("command:*", () => {
      console.error(
        `\n${ERROR_PREFIX} Invalid command: ${chalk.red("%s")}`,
        program.args.join(" ")
      );
      console.log(
        `See ${chalk.red("--help")} for a list of available commands.\n`
      );
      process.exit(1);
    });
  }
}
