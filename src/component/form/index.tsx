import { useEffect } from "react";
import type { FormProps } from "./props";
import { useAppDispatch } from "../../redux";
import { formSlice } from "../../redux/form";

export function Form(props: FormProps) {
    const dispatch = useAppDispatch();
    useEffect(() => {
        console.log(`Form ${props.id} mounted`);
        dispatch(formSlice.actions.registerFields({
            formId: props.id,
            fields: []
        }));
        
    }, []);
    return <form>
        {props.children}
    </form>
}