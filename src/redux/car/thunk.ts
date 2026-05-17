import { createAsyncThunk } from "@reduxjs/toolkit";
import { FORM_NAME_1, formSlice } from "../form";

export const createCarThunk = createAsyncThunk("car/createCar", async (_, { dispatch }) => {
    dispatch(formSlice.actions.submitting({ formId: FORM_NAME_1 }));
    try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const newCar = { id: Date.now(), make: "Toyota", model: "Corolla" };
        dispatch(formSlice.actions.submitted({ formId: FORM_NAME_1 }));
    } catch (error) {
        // Trigger your global ui error handling here, e.g. using a toast notification
        // dispatch(formSlice.actions.submissionFailed({ formId: FORM_NAME_1 }));  
    }
});