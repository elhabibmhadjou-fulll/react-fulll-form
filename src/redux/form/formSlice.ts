import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { FieldState, FormState } from "./state";
import { hasFieldError } from "./hasFielError";
import { hasField } from "./hasField";

const initialState = {} as FormState

export const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        submitting: (state: FormState, action: PayloadAction<{
            formId: FormState[string]["id"];
        }>) => {
            const { formId } = action.payload;
            const form = state[formId];
            if (!form) {
                return;
            }

            form.status = "submitting";
        },
        submitted: (state: FormState, action: PayloadAction<{
            formId: FormState[string]["id"];
        }>) => {
            const { formId } = action.payload;
            const form = state[formId];
            if (!form) {
                return;
            }

            form.status = "submitted";
        },
        updateField: (state: FormState, action: PayloadAction<{
            formId: FormState[string]["id"];
            fieldId: FormState[string]["id"];
            value: string;
            status: "idle" | "valid" | "error";
        }>) => {
            const { formId, fieldId, value, status } = action.payload;
            const form = state[formId];

            if (!form) {
                return;
            }

            if (!hasField(form)) {
                return;
            }

            const field = form.fields[fieldId];
            if (!field) {
                return;
            }

            field.value = value;
            field.status = status;
            const hasError = hasFieldError(form);
            if (hasError) {
                form.status = "error";
                return;
            }
        },
        registerFields(state: FormState, action: PayloadAction<{
            formId: FormState[string]["id"];
            fields: FieldState[];
        }>) {
            const { formId, fields } = action.payload;
            state[formId] = {
                id: formId,
                status: "idle",
                fields: Object.fromEntries(
                    fields.map((f) => [f.id, {
                        id: f.id,
                        value: f.value,
                        status: f.status,
                        name: f.name,
                    }])
                )
            }
        },
        resetForm: () => initialState
    },
})

export const formReducer = formSlice.reducer;