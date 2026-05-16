import type { FormStateItem } from "./state";

export function hasFieldError(form: FormStateItem): boolean {
    return Object.values(form.fields).some(field => field.status === "error");
}