import { useAppSelector } from "../../../../redux";
import type { RedirectOnStatusChangeProps } from "./props";

export function RedirectOnFormStatusChange(props: RedirectOnStatusChangeProps) {
    const form = useAppSelector(state => state.form[props.formId]);

    if (form && form.status === props.eventType) {
        window.location.href = props.to;
    }

    return null;
}