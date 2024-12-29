import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

type CompanyNameProps = {
  value: string
  onChange: (website: string) => void
}

function CompanyName({ value, onChange }: CompanyNameProps) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography gutterBottom>Tên công ty</Typography>
      <TextField
        fullWidth
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder='Công ty TNHH An Bảo Chánh'
      />
    </Box>
  )
}

export default CompanyName
