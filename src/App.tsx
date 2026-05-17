import { Box, Divider, Stack, Typography } from '@mui/material'
import { TextField } from './component/text-field'
import { DebugPanel } from './component/debug-panel'
import { SubmitButton } from './component/submit-button'
import { PhoneValidator } from './validator/PhoneValidator'
import { EmailValidator } from './validator/EmailValidator'
import { UsernameValidator } from './validator/UsernameValidator'
import { useCallback, useState } from 'react'
import { FORM_NAME_1, FORM_NAME_2 } from './redux/form'
import { ActionButton } from './component/action-button'
import { RedirectOnFormStatusChange } from './fulll-lib/form-core/component/redirect-on-status-change'

function App() {
  const [active, setActive] = useState(false);
  const searchParams = useCallback(() => new URLSearchParams(window.location.search), []);
  const success = searchParams().get("success") === "true";

  return <Stack spacing={4} direction="row">
    <Stack spacing={2} direction={"column"} sx={{ width: "100%", maxWidth: "50vw" }}>
      <div >
        <Stack spacing={2}>
          {success && <Typography variant='h5' color="green">Form submitted successfully!</Typography>}
          <Typography variant='h6'>Formulaire 1</Typography>
          <TextField
            formId={FORM_NAME_1}
            name='name'
            label='Name'
            placeholder='Enter your name'
            validator={new UsernameValidator()}
            required
          />
          <TextField
            formId={FORM_NAME_1}
            name='email'
            label='Email'
            placeholder='Enter your email'
            validator={new EmailValidator()}
          />
          {active && <TextField
            formId={FORM_NAME_1}
            name='phone'
            label='phone'
            placeholder='Enter your phone'
            validator={new PhoneValidator()}
            required
          />}
          <RedirectOnFormStatusChange
            formId={FORM_NAME_1}
            to='/?success=true'
            eventType='submitted'
          />
          <ActionButton onClick={() => setActive(!active)} />
          <SubmitButton formId={FORM_NAME_1} />
        </Stack>
      </div>

      <Box sx={{ height: "20px" }} />
      <Divider />
      <Box sx={{ height: "20px" }} />

      <pre>Dernier rafraischissement de page: {JSON.stringify((Date.now() / 1000).toFixed(1))}</pre>

      <Stack spacing={2}>
        <Typography variant='h6'>Formulaire 2</Typography>
        <TextField
          formId={FORM_NAME_2}
          name='name'
          label='Name'
          placeholder='Enter your name' value='test 2'
          validator={new UsernameValidator()}
        />
        <TextField
          formId={FORM_NAME_2}
          name='email'
          label='Email'
          placeholder='Enter your email'
          validator={new EmailValidator()}
        />
        <TextField
          formId={FORM_NAME_2}
          name='password'
          label='Password'
          placeholder='Reset your password'
          validator={new PhoneValidator()}
        />
          <SubmitButton formId={FORM_NAME_2} />
        </Stack>
    </Stack>

    <DebugPanel />
  </Stack>
}

export default App
