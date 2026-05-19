import { Stack, Typography } from "@mui/material";
import { useCallback, useMemo } from "react";
import { TextField } from "../../../../component/text-field";
import { FORM_1 } from "../../../../redux";
import { UsernameValidator } from "../../../../validator/UsernameValidator";
import { EmailValidator } from "../../../../validator/EmailValidator";

export function CarForm() {

    // Stable instances: validators and behaviors must NOT be recreated on every render,
    // otherwise useSyncExternalStore re-subscribes to a brand-new (empty) validator
    // and the debounce timer is lost on every keystroke.
    const usernameValidator = useMemo(() => new UsernameValidator(), []);
    const emailValidator = useMemo(() => new EmailValidator(), []);

    return <div>
        <Stack spacing={1}>
            <Typography variant='h6'>Car Form </Typography>
            <Typography variant='body1'>(synchronous form)</Typography>
            <TextField
                formId={FORM_1.id}
                name='name'
                label='Name'
                placeholder='Enter your name'
                validator={usernameValidator}
                required
            />
            <TextField
                formId={FORM_1.id}
                name='email'
                label='Email'
                placeholder='Enter your email'
                validator={emailValidator}
                required
            />
        </Stack>

    </div >
}