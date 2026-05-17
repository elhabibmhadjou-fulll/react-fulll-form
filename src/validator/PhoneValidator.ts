import { IValidator } from "./IValidator";

export class PhoneValidator extends IValidator<string> {
    public validate(value?: string) {
        this.addError(value?.length !== 10, "Phone number must be 10 digits");
    }
}