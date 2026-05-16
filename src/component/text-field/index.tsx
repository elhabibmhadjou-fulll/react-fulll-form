import { TextField as MuiTextField, Stack } from "@mui/material";
import type { TextFieldProps } from "./props";
import { formSlice, useAppDispatch, useAppSelector } from "../../redux";
import { getFormFieldById } from "../../redux/form/getFormFieldByName";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useMemo } from "react";

export function TextField({ validator, ...props }: TextFieldProps) {
    const id = useMemo(() => uuidv4(), []);

    const field = useAppSelector((state) => {
        return getFormFieldById(state.form[props.formId], id)
    });

    const dispatch = useAppDispatch();

    const hasError = validator
        .handle(field?.value ?? "")
        .hasError();

    useEffect(() => {
        dispatch(formSlice.actions.registerField({
            formId: props.formId,
            field: {
                id,
                name: props.name,
                value: props?.value ?? "",
                status: hasError ? "error" : "valid"
            }
        }));
        return () => {
            console.log(props.formId, " --> Unregistering field", id);
        }
    }, [props.formId, id, dispatch])

    useEffect(() => {
        if (props?.value !== undefined) {
            dispatch(formSlice.actions.updateField({
                formId: props.formId,
                fieldId: id,
                value: props.value,
                status: hasError ? "error" : "valid"
            }));
        }
    }, [props?.value, props.formId, id, dispatch]);

    if (!field) {
        return null;
    }

    return <Stack spacing={2}>
        <MuiTextField
            label={props.label}
            placeholder={props.placeholder}
            variant="outlined"
            value={field?.value}
            onChange={(e) => dispatch(formSlice.actions.updateField({
                formId: props.formId,
                fieldId: id,
                value: e.target.value,
                status: hasError ? "error" : "valid"
            }))}
            error={hasError}
            helperText={validator.getFirstError()}
        />
        <pre>{JSON.stringify(field, null, 2)}</pre>
    </Stack>
}