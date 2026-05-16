import { IValidator } from "./IValidator";

export class EmailValidator extends IValidator<string> {
    public validate(value?: string): boolean {
        if (value === undefined || value === null || value.trim() === "") {
            return false;
        }

        if (!value.includes('@')) {
            this.addError("Email must contain '@'");
            return false;
        }

        return true;
    }
}