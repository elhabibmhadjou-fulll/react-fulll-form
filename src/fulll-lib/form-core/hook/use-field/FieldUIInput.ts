import type { IValidator } from "../../validator";

export interface FieldUIInput {
    value: string;
    touched: boolean;
    submitting: boolean;
    validator: IValidator<string>;
}