import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

type CompanyPhoneContactProps = {
  value: string
  onChange: (value: string) => void
}

export const CompanyPhoneContact: React.FC<CompanyPhoneContactProps> = (props) => {
  const handlePhoneChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    props.onChange(event.target.value)
  }

  return (
    <Box>
      <Typography className='font-semibold font-sans text-base mb-2'>Số điện thoại:</Typography>

      <TextField
        onChange={handlePhoneChange}
        value={props.value}
        required
        size='small'
        type='number'
        sx={{ marginTop: 1 }}
        slotProps={{
          input: {
            startAdornment: (
              <Box sx={{ display: 'inline-flex' }}>
                <Typography>+84</Typography>
                <Divider
                  sx={{ opacity: 1, borderRightWidth: 2, marginX: 1 }}
                  variant='fullWidth'
                  orientation='vertical'
                  flexItem
                ></Divider>
              </Box>
            )
          }
        }}
      ></TextField>
    </Box>
  )
}
