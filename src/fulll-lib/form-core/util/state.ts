export type FormId<T extends string> = T extends string ? T : never;

export type FormState<T extends FormId<string>> = Record<T, FormStateItem<T>>;

export type FormStateItem<T extends FormId<string>> = {
    id: T;
    name: string;
    status: "idle" | "submitting" | "submitted" | "error"
    fields: Record<string, FieldState>
}

export interface FieldState {
    status: "idle" | "valid" | "error"
    id: string
    name: string
    value: string
}
