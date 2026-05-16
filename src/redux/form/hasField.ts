import type { FormStateItem } from "./state";

export function hasField(form: FormStateItem): boolean {
    return Object.keys(form.fields).length > 0;
}