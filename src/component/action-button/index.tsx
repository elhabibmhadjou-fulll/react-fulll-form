import { FORM_NAME_1, useAppSelector } from "../../redux";
import type { ActionButtonProps } from "./props";

export function ActionButton(props: ActionButtonProps) { 
    const form = useAppSelector((state) => state.form[FORM_NAME_1]);
    if(!form) {
        return null
    }
    
    const status = form.status === "submitting"
    return (
        <button disabled={status} onClick={props.onClick}>Action</button>
    )
}