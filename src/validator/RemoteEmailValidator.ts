import { IValidator } from "./IValidator";

export class RemoteEmailValidator extends IValidator<string> {
    public async validate(value: string) {
        const res = await new Promise((resolve) => setTimeout(resolve, 1000));
        this.addError(!value.includes('@'), "Email must contain '@'");
    }
}