import { CommandLoader, Input } from "../../commands";
export declare function localBinExists(program: string): boolean;
export declare function loadLocalBinCommandLoader(): typeof CommandLoader;
export declare const compareList: (input?: Input[]) => Input[];
