import { Input } from "../../commands";
export declare const generateAnswerToInput: (answer: {
    [key: string]: string;
}) => Input[];
export declare const generateInput: (name: string, message: string) => (defaultAnswer: string) => any;
export declare const generateSelect: (name: string) => (message: string) => (choices: string[]) => any;
export declare const askForMissingInformation: (inputs: Input[]) => Promise<any>;
