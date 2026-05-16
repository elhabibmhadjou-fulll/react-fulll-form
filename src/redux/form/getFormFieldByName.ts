import type { FormState } from "./state";

export function getFormFieldById(form: FormState[string], id: string) {
    return form?.fields[id] || null;
}