import { FormControl, InputLabel, MenuItem, Select, FormHelperText, Stack } from "@mui/material";
import type { SelectFieldProps } from "./props";
import { useField } from "../shared/use-field";

export function SelectField({ validator, behaviors = [], ...props }: SelectFieldProps) {
    const {
        field,
        showError,
        isSubmitting,
        errorMessage,
        onChange,
        onBlur,
    } = useField({
        formId: props.formId,
        fieldId: props.name,
        name: props.name,
        validator,
        behaviors,
        value: props.value,
        required: props.required,
    });

    if (!field) {
        return null;
    }

    const labelId = `select-${props.name}-label`;

    return <Stack spacing={2}>
        <FormControl variant="outlined" error={showError} disabled={isSubmitting}>
            <InputLabel id={labelId}>{props.label}</InputLabel>
            <Select
                labelId={labelId}
                value={field.value}
                onChange={(e) => onChange(e.target.value)}
                onBlur={onBlur}
                label={props.label}
            >
                {props.options.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
            {showError && <FormHelperText>{errorMessage}</FormHelperText>}
        </FormControl>
    </Stack>
}