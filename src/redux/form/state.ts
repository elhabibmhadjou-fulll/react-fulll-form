export type FormState = Record<string, FormStateItem>;

export type FormStateItem = {
    id: string;
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

const forms: FormState = {
    "form1": {
        id: "form1",
        name: "Form 1",
        status: "idle",
        fields: {
            "field1": {
                id: "field1",
                name: "Field 1",
                value: "",
                status: "idle"
            },
            "field2": {
                id: "field2",
                name: "Field 2",
                value: "",
                status: "idle"
            }
        }
    }
}

const field = forms["form1"].fields["field1"];