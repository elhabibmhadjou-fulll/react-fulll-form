import { TextField as MuiTextField, Stack, CircularProgress, InputAdornment } from "@mui/material";
import type { TextFieldProps } from "./props";
import { useField } from "../../fulll-lib/form-core";

export function TextField(props: TextFieldProps) {
    const controller = useField({
        formId: props.formId,
        fieldId: props.name,
        name: props.name,
        validator: props.validator,
        behaviors: props?.behaviors,
        value: props.value,
        required: props.required,
    });

    return <Stack spacing={2}>
        <MuiTextField
            label={props.label}
            placeholder={props.placeholder}
            variant="outlined"
            value={controller.field?.value ?? ""}
            onChange={(e) => controller.onChange(e.target.value)}
            onBlur={controller.onBlur}
            error={controller.showError}
            helperText={controller.showError ? controller.errorMessage : undefined}
            disabled={controller.isSubmitting || controller.isLocked}
            slotProps={{
                input: {
                    endAdornment: controller.isLoading ? (
                        <InputAdornment position="end"><CircularProgress size={20} /></InputAdornment>
                    ) : undefined,
                },
            }}
        />
    </Stack>;
}