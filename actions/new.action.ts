/**
 * @author hieubt
 * @email [hieubt2@msb.com.vn]
 * @create date 08/01/2024
 * @modify date 08/01/2024
 * @desc [description]
 */
import { Input } from "../commands";
import { installProject } from "../lib/install/install";
import {
  askForMissingInformation,
  generateAnswerToInput,
} from "../lib/questions/questions";
import { AbstractAction } from "./abstract.action";

export class NewAction extends AbstractAction {
  public async handle(
    inputs?: Input[] | undefined,
    options?: Input[] | undefined
  ): Promise<void> {
    const name = inputs?.some((o: Input) => o.name === "name" && o.value);

    if (!name) {
      let questions = [
        {
          name: "name",
          value: "Tên dự án",
          options: [{ name: "type", value: "input" }],
        },
      ];
      const answers = await askForMissingInformation(questions);
      inputs = generateAnswerToInput(answers);
    }
    let questions: Input[] = [];
    /**
     * FIXME: Tạm để đây sau bổ sung lại
     */
    // const template = options?.some(
    //   (o: Input) => o.name === "template" && o.value
    // );
    // if (!template) {
    //   questions.push({
    //     name: "template",
    //     value: "Vui lòng chọn template",
    //     options: [
    //       {
    //         name: "type",
    //         value: "list",
    //         options: [
    //           { name: "choices", value: ["micro-frontend", "spa", "ssr"] },
    //         ],
    //       },
    //     ],
    //   });
    // }
    //Check điều kiện option
    const shouldOption = options?.some(
      (option: Input) => option.name === "option" && option.value === true
    );
    if (!shouldOption) {
      inputs?.push({ name: "micro", value: "router", options: options });
      inputs?.push({ name: "micro", value: "libraries", options: options });
      // _option?.push({ name: "add-router", value: true });
      // inputs?.push({ name: "micro", value: "login", options: _option });
    }
    const answers = await askForMissingInformation(questions);
    options = [...(options || []), ...generateAnswerToInput(answers)];
    await installProject(inputs, options);
    process.exit(0);
  }
}
