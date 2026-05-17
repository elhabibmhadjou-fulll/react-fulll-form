import { Box, Divider, Stack, Typography } from '@mui/material'
import { TextField } from './component/text-field'
import { HistoryPanel } from './component/history-panel'
import { SubmiButton } from './component/submit-button'
import { PhoneValidator } from './validator/PhoneValidator'
import { EmailValidator } from './validator/EmailValidator'
import { UsernameValidator } from './validator/UsernameValidator'
import { useState } from 'react'
import { FORM_NAME_1 } from './redux'

function App() {
  const [active, setActive] = useState(false);
  return <Stack spacing={4} direction={"row"}>
    <Stack spacing={2} direction={"column"} sx={{ width: "100%", maxWidth: "50vw" }}>
      <div >
        <Stack spacing={2}>
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
          <button onClick={() => setActive(!active)}>{active ? "demonter" : "monter"}</button>
          <SubmiButton formId={FORM_NAME_1} />
        </Stack>
      </div>

      <Box sx={{ height: "20px" }} />
      <Divider />
      <Box sx={{ height: "20px" }} />


      {/* <Stack spacing={2}>
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
      </Stack> */}
    </Stack>

    <HistoryPanel />
  </Stack>
}

export default App
