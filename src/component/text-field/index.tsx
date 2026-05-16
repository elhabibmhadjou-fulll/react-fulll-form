import { TextField as MuiTextField} from "@mui/material";
import type { TextFieldProps } from "./props";

export function TextField(props: TextFieldProps) {
    return <MuiTextField id="outlined-basic" label={props.label} placeholder={props.placeholder} variant="outlined" />
}