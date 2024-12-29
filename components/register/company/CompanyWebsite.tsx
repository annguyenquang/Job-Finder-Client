import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

type CompanyWebsiteProps = {
  value: string
  onChange: (website: string) => void
}

export function CompanyWebsite({ value, onChange }: CompanyWebsiteProps) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography gutterBottom>Website công ty</Typography>
      <TextField
        fullWidth
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder='www.mycompany.com'
      />
    </Box>
  )
}
