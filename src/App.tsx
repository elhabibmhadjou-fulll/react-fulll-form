import { Box, Divider, Stack, Typography } from '@mui/material'
import { TextField } from './component/text-field'
import { HistoryPanel } from './component/history-panel'
import { SubmiButton } from './component/submit-button'
import { PhoneValidator } from './validator/PhoneValidator'
import { EmailValidator } from './validator/EmailValidator'
import { UsernameValidator } from './validator/UsernameValidator'

const FORM_NAME_1 = "exampleForm";

function App() {
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
          />
          <TextField
            formId={FORM_NAME_1}
            name='email'
            label='Email'
            placeholder='Enter your email'
            validator={new EmailValidator()}
          />
          <TextField
            formId={FORM_NAME_1}
            name='password'
            label='Password'
            placeholder='Enter your password'
            validator={new PhoneValidator()}
          />
          <SubmiButton formId={FORM_NAME_1}/>
        </Stack>
      </div>

      <Box sx={{ height: "20px" }} />
      <Divider />
      <Box sx={{ height: "20px" }} />


      {/* <Form name="exampleForm2">
        <Stack spacing={2}>
          <Typography variant='h6'>Formulaire 2</Typography>
          <TextField name='name' label='Name' placeholder='Enter your name' value='test 2' />
          <TextField name='email' label='Email' placeholder='Enter your email' />
          <TextField name='password' label='Password' placeholder='Reset your password' />
        </Stack>
      </Form> */}
    </Stack>

    <HistoryPanel />
  </Stack>
}

export default App
