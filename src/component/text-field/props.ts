import type { FormStateId } from "../../redux";
import type { IValidator } from "../../validator/IValidator";

export type TextFieldProps = {
    name: string
    label: string;
    placeholder?: string;
    value?: string;
    required?: boolean;
    formId: FormStateId;
    validator: IValidator<string>;
    behaviors?: []
}