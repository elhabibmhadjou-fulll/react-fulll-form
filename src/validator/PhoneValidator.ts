import { IValidator } from "./IValidator";

export class PhoneValidator extends IValidator<string> {
    public validate(value?: string): boolean {
        if (value === undefined || value === null || value.trim() === "") {
            return false;
        }

        if (!value) {
            this.addError("Phone number is required");
            return false;
        } else if (value.length !== 10) {
            this.addError("Phone number must be 10 digits");
            return false;
        }

        return true;
    }

}