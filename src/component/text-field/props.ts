import type { FormId } from "../../redux";
import type { IValidator } from "../../validator/IValidator";

export type TextFieldProps = {
    name: string
    label: string;
    placeholder?: string;
    value?: string;
    required?: boolean;
    formId: FormId;
    validator: IValidator<string>;
    behaviors?: []
}