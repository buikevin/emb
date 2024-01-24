import { existsSync } from "fs";
import { join, posix } from "path";
import { CommandLoader, Input } from "../../commands";

const localBinPathSegments = [process.cwd(), "node_modules", "embcli"];

export function localBinExists(program: string) {
  return existsSync(join(...[process.cwd(), "node_modules", program]));
}

export function loadLocalBinCommandLoader(): typeof CommandLoader {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const commandsFile = require(posix.join(...localBinPathSegments, "commands"));
  return commandsFile.CommandLoader;
}

export const compareList = (input: Input[] = []) => {
  return input.filter((val) => val.value !== undefined);
};
