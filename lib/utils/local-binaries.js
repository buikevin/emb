"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareList = exports.loadLocalBinCommandLoader = exports.localBinExists = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const localBinPathSegments = [process.cwd(), "node_modules", "embcli"];
function localBinExists(program) {
    return (0, fs_1.existsSync)((0, path_1.join)(...[process.cwd(), "node_modules", program]));
}
exports.localBinExists = localBinExists;
function loadLocalBinCommandLoader() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const commandsFile = require(path_1.posix.join(...localBinPathSegments, "commands"));
    return commandsFile.CommandLoader;
}
exports.loadLocalBinCommandLoader = loadLocalBinCommandLoader;
const compareList = (input = []) => {
    return input.filter((val) => val.value !== undefined);
};
exports.compareList = compareList;
