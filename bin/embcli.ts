#!/usr/bin/env node

import { Command } from "commander";
import {
  loadLocalBinCommandLoader,
  localBinExists,
} from "../lib/utils/local-binaries";
import { CommandLoader } from "../commands";
const bootstrap = async () => {
  const program: Command = new Command();
  program
    .version(
      require("../../package.json").version,
      "-v, --version",
      "Xem phiên bản hiện tại."
    )
    .usage("<command> [options]")
    .helpOption("-h, --help", "xem thông tin trợ giúp.");
  if (localBinExists("embcli")) {
    const localCommandLoader = loadLocalBinCommandLoader();
    await localCommandLoader.load(program);
  } else {
    await CommandLoader.load(program);
  }
  await program.parseAsync(process.argv);

  if (!process.argv.slice(2).length) {
    program.outputHelp();
  }
};

bootstrap();
