import { useEffect, useState, useSyncExternalStore } from "react";
import { DefaultBehavior, getFormFieldById, type FieldState, type UIFlag, type UseFieldProps } from "../../../fulll-lib";
import { formSlice, useAppDispatch, useAppSelector } from "../../../redux";
import { toVerdict } from "../../../fulll-lib";

export type FieldStatus = FieldState<string>["status"];

export function useField(props: UseFieldProps) {
    const { formId, fieldId, validator, value, required } = props;
    const behaviors = props.behaviors && props.behaviors.length > 0
        ? props.behaviors
        : [new DefaultBehavior()];

    const [touched, setTouched] = useState(false);
    const dispatch = useAppDispatch();
    const formStatus = useAppSelector((state) => state.form[formId]?.status);
    const field = useAppSelector((state) => getFormFieldById(state.form[formId], fieldId));

    // Re-render whenever the validator's internal state changes
    useSyncExternalStore(
        (cb) => validator.subscribe(cb),
        () => validator.getState(),
    );

    // Mount: register the field. Hydrate from any pre-existing Redux state +
    // current validator status — the field may already exist if the layout
    // didn't unmount the form (only the layout is responsible for resetting).
    useEffect(() => {
        const verdict = toVerdict(validator.getState());
        const status: FieldStatus = field?.status
            ?? (verdict === "error"
                ? { value: "error", errors: validator.getErrors() }
                : { value: verdict });
        dispatch(formSlice.actions.registerField({
            formId,
            field: {
                id: fieldId,
                value: value ?? field?.value ?? "",
                status,
            },
        }));
    }, [formId, fieldId]);

    // External `value` prop changes (controlled-by-parent case)
    useEffect(() => {
        if (value !== undefined) {
            runValidation(value);
        }
    }, [value, formId, fieldId]);

    function runValidation(nextValue: string) {
        dispatch(formSlice.actions.updateField({
            formId, fieldId, value: nextValue, status: "idle",
        }));
        validator.setOptions({ required }).handleAsync(nextValue).then(() => {
            dispatch(formSlice.actions.updateFieldStatus({
                formId,
                fieldId,
                status: toVerdict(validator.getState()),
                errors: validator.getErrors(),
            }));
        });
    }

    function onChange(newValue: string) {
        runValidation(newValue);
    }

    function onBlur() {
        setTouched(true);
    }

    // Behaviors are pure: derive UI flags from current state.
    const flags: UIFlag[] = behaviors.flatMap(b => b.getUIFlags({
        value: field?.value ?? "",
        touched,
        submitting: formStatus?.value === "submitting",
        validator,
    }));

    const hasFlag = (f: UIFlag) => flags.includes(f);

    return {
        field,
        flags,
        isPristine: hasFlag("pristine"),
        isLoading: hasFlag("loading"),
        isLocked: hasFlag("locked"),
        showError: hasFlag("error"),
        errorMessage: hasFlag("error") ? validator.getFirstError() : undefined,
        isSubmitting: formStatus?.value === "submitting",
        onChange,
        onBlur,
    };
}