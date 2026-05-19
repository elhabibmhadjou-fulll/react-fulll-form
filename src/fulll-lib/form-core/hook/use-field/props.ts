import type { IBehavior } from "../../behavior/IBehavior";
import type { FieldStateId, FormStateId } from "../../../../redux";
import type { IValidator } from "../../validator/IValidator";

export interface UseFieldProps {
    formId: FormStateId;
    fieldId: FieldStateId;
    name: string;
    validator: IValidator<string>;
    behaviors?: IBehavior[];
    value?: string;
    required?: boolean;
}
