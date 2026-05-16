import { Box, Divider, Stack, Typography } from '@mui/material'
import { Form } from './component/form'
import { TextField } from './component/text-field'

function App() {
  return <div>
    <Form id="exampleForm">
      <Stack spacing={2} sx={{ maxWidth: "300px" }}>
        <Typography variant='h6'>Formulaire 1</Typography>
        <TextField label='Name' placeholder='Enter your name' />
        <TextField label='Email' placeholder='Enter your email' />
        <TextField label='Password' placeholder='Enter your password' />
      </Stack>
    </Form>

    <Box sx={{ height: "20px" }} />
    <Divider />
  </div>
}

export default App
