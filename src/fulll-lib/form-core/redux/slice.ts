import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { hasField, hasFieldError } from "../util";
import type { FieldState, FormState } from "../util/state";

/**
 * Inside reducers, `state` is typed as `Draft<FormState<T>>` by Immer.
 * When `T` is generic, `Draft<Record<T, ...>>` cannot be indexed by `T` — this is
 * a known TypeScript/Immer limitation. We cast `state` to `FormState<string>` internally
 * to work around this. The public API (actions, selectors) remains typed with `T`.
 */
export const createFormSlice = <T extends string>(name: string, initialState = {} as FormState<T>) => {
    return createSlice({
        name: name,
        initialState,
        reducers: {
            submitting: (state, action: PayloadAction<{
                formId: T;
            }>) => {
                const s = state as FormState<string>;
                const { formId } = action.payload;
                const form = s[formId];
                if (!form) {
                    return;
                }

                form.status = "submitting";
            },
            submitted: (state, action: PayloadAction<{
                formId: T;
            }>) => {
                const s = state as FormState<string>;
                const { formId } = action.payload;
                const form = s[formId];
                if (!form) {
                    return;
                }

                form.status = "submitted";
            },
            updateField: (state, action: PayloadAction<{
                formId: T;
                fieldId: string;
                value: string;
                status: "idle" | "valid" | "error";
            }>) => {
                const s = state as FormState<string>;
                const { formId, fieldId, value, status } = action.payload;
                const form = s[formId];

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
            registerField: (state, action: PayloadAction<{
                formId: T;
                field: FieldState;
            }>) => {
                const s = state as FormState<string>;
                const { formId, field } = action.payload;
                if (!s[formId]) {
                    s[formId] = {
                        id: formId,
                        name: formId,
                        status: field.status === "error" ? "error" : "idle",
                        fields: {
                            [field.id]: field
                        }
                    };
                    return;
                }
                s[formId].fields[field.id] = field;
            },
            unregisterField: (state, action: PayloadAction<{
                formId: T;
                fieldId: string;
            }>) => {
                const s = state as FormState<string>;
                const { formId, fieldId } = action.payload;
                if (!s[formId]) {
                    return;
                }

                delete s[formId].fields[fieldId];
            },
            error(state, action: PayloadAction<{
                formId: T;
            }>) {
                const s = state as FormState<string>;
                const { formId } = action.payload;
                const form = s[formId];
                if (!form) {
                    return;
                }

                form.status = "error";
            },
            resetForm: () => initialState
        },
    })
}