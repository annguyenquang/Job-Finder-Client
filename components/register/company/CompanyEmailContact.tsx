import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

type CompanyEmailContactProps = {
  value: string
  onChange: (value: string) => void
}

export const CompanyEmailContact: React.FC<CompanyEmailContactProps> = (props) => {
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    props.onChange(event.target.value)
  }

  return (
    <Box>
      <Typography className='font-semibold font-sans text-base mb-2'>Email:</Typography>

      <TextField
        id='outlined-basic'
        size='small'
        variant='outlined'
        type='email'
        placeholder='Email'
        className='min-w-80'
        value={props.value}
        onChange={handleEmailChange}
      />
    </Box>
  )
}
