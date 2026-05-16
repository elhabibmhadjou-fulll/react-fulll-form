import { Button } from "@mui/material";
import { useContext } from "react";
import { formSlice, useAppDispatch, useAppSelector } from "../../redux";
import { hasFieldError } from "../../redux/form/hasFielError";
import type { SubmitButtonProps } from "./props";

export function SubmiButton(props: SubmitButtonProps) {
    const formId = props.formId;
    const dispatch = useAppDispatch();
    const form = useAppSelector((state) => state.form[formId]);

    if (!form) {
        return null
    }

    return <Button
        variant="contained"
        color="primary"
        type="submit"
        onClick={() => dispatch(formSlice.actions.submitting({
            formId,
        }))}
        disabled={hasFieldError(form) || form.status === "submitting"}
        loading={form.status === "submitting"}
    >
        Submit
    </Button>
}