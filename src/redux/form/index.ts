import { createFormSlice } from "../../fulll-lib/form-core";

export const FORM_NAME_1 = "myExampleForm1"
export const FORM_NAME_2 = "myExampleForm2"

export type FormStateId = typeof FORM_NAME_1 | typeof FORM_NAME_2;
export const formSlice = createFormSlice<FormStateId>("form");
export const formReducer = formSlice.reducer;