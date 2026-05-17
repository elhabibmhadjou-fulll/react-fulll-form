import type { FormStateItem } from "./state";

export function getFormFieldById<T extends string>(form: FormStateItem<T>, id: string) {
    return form?.fields[id] || null;
}