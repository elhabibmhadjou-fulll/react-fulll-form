import { IValidator } from "../fulll-lib/form-core/validator/IValidator";

export class EmailValidator extends IValidator<string> {
    public validate(value: string) {
        this.addError(!value.includes('@'), "Email must contain '@'");
    }
}