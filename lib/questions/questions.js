"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.askForMissingInformation = exports.generateSelect = exports.generateInput = exports.generateAnswerToInput = void 0;
const inquirer = require("inquirer");
const generateAnswerToInput = (answer) => {
    return Object.keys(answer).map((val) => ({
        name: val,
        value: answer[val],
    }));
};
exports.generateAnswerToInput = generateAnswerToInput;
const generateInput = (name, message) => {
    return (defaultAnswer) => ({
        type: "input",
        name,
        message,
        default: defaultAnswer,
    });
};
exports.generateInput = generateInput;
const generateSelect = (name) => {
    return (message) => {
        return (choices) => ({
            type: "list",
            name,
            message,
            choices,
        });
    };
};
exports.generateSelect = generateSelect;
const askForMissingInformation = async (inputs) => {
    const question = inputs.map((_val) => {
        const type = _val.options?.find((val) => val.name === "type")?.value || "input";
        const choices = _val.options
            ?.find((val) => val.name === "type" && val.value === "list")
            ?.options?.find((val) => val.name === "choices")?.value || [];
        return {
            name: _val.name,
            message: _val.value,
            type,
            choices,
        };
    });
    return await inquirer.prompt(question);
};
exports.askForMissingInformation = askForMissingInformation;
