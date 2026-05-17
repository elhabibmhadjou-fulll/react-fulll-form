import { TextField as MuiTextField, Stack } from "@mui/material";
import type { TextFieldProps } from "./props";
import { formSlice, useAppDispatch, useAppSelector } from "../../redux";
import { getFormFieldById } from "../../fulll-lib/form-core/util/getFormFieldByName";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useMemo, useState } from "react";

export function TextField({ validator, ...props }: TextFieldProps) {
    const id = useMemo(() => uuidv4(), []);
    const [touched, setTouched] = useState(false);

    const formStatus = useAppSelector((state) => state.form[props.formId]?.status);

    const field = useAppSelector((state) => {
        return getFormFieldById(state.form[props.formId], id)
    });

    const dispatch = useAppDispatch();

    function validate(value: string): "error" | "valid" {
        return validator
            .setOptions({ required: props.required })
            .handle(value)
            .hasError() ? "error" : "valid";
    }

    useEffect(() => {
        console.log(props.formId, " --> Registering field", id);
        dispatch(formSlice.actions.registerField({
            formId: props.formId,
            field: {
                id,
                name: props.name,
                value: props?.value ?? "",
                status: validate(props?.value ?? "")
            }
        }));
        return () => {
            dispatch(formSlice.actions.unregisterField({
                formId: props.formId,
                fieldId: id
            }));
            console.log(props.formId, " --> Unregistering field", id);
        }
    }, [props.formId, id, dispatch]);

    useEffect(() => {
        if (props?.value !== undefined) {
            dispatch(formSlice.actions.updateField({
                formId: props.formId,
                fieldId: id,
                value: props.value,
                status: validate(props.value)
            }));
        }
    }, [props?.value, props.formId, id, dispatch]);

    if (!field) {
        return null;
    }

    const hasError = field.status === "error";
    // Run validator for error messages display
    validator.setOptions({ required: props.required }).handle(field.value);

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        const newValue = e.target.value;
        dispatch(formSlice.actions.updateField({
            formId: props.formId,
            fieldId: id,
            value: newValue,
            status: validate(newValue)
        }));
    }

    const showError = hasError && touched;
    const isSubmitting = formStatus === "submitting";

    return <Stack spacing={2}>
        <MuiTextField
            label={props.label}
            placeholder={props.placeholder}
            variant="outlined"
            value={field?.value}
            onChange={onChange}
            onBlur={() => setTouched(true)}
            error={showError}
            helperText={showError ? validator.getFirstError() : undefined}
            disabled={isSubmitting}
        />
        <pre>{JSON.stringify(hasError, null, 2)}</pre>
    </Stack>
}