import type { FormStateItem } from "./state";

export function hasFieldError<T extends string>(form: FormStateItem<T>): boolean {
    return Object.values(form.fields).some(field => field.status === "error");
}