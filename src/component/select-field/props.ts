import type { IFieldBehavior } from "../../behavior/IFieldBehavior";
import type { FieldStateId, FormStateId } from "../../redux";
import type { IValidator } from "../../fulll-lib/form-core/validator/IValidator";

export type SelectFieldProps = {
    name: FieldStateId;
    label: string;
    options: { label: string; value: string }[];
    value?: string;
    required?: boolean;
    formId: FormStateId;
    validator: IValidator<string>;
    behaviors?: IFieldBehavior[];
}