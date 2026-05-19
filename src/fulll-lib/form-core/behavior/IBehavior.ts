import type { FieldUIInput } from "../hook/use-field/FieldUIInput";
import type { UIFlag } from "../hook/use-field/UiFlag";

export interface IBehavior {
    getUIFlags(input: FieldUIInput): UIFlag[];
}
