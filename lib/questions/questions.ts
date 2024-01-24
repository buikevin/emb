import { Input } from "../../commands";
const inquirer = require("inquirer");

export const generateAnswerToInput = (answer: {
  [key: string]: string;
}): Input[] => {
  return Object.keys(answer).map((val: string) => ({
    name: val,
    value: answer[val],
  }));
};
export const generateInput = (name: string, message: string) => {
  return (defaultAnswer: string): any => ({
    type: "input",
    name,
    message,
    default: defaultAnswer,
  });
};

export const generateSelect = (
  name: string
): ((message: string) => (choices: string[]) => any) => {
  return (message: string) => {
    return (choices: string[]) => ({
      type: "list",
      name,
      message,
      choices,
    });
  };
};
export const askForMissingInformation = async (inputs: Input[]) => {
  const question = inputs.map((_val: Input) => {
    const type =
      _val.options?.find((val: Input) => val.name === "type")?.value || "input";
    const choices =
      _val.options
        ?.find((val: Input) => val.name === "type" && val.value === "list")
        ?.options?.find((val: Input) => val.name === "choices")?.value || [];
    return {
      name: _val.name,
      message: _val.value,
      type,
      choices,
    };
  });
  return await inquirer.prompt(question);
};
