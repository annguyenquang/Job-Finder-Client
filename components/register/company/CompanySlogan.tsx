import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

type CompanySloganProps = {
  value: string
  onChange: (slogan: string) => void
}

export function CompanySlogan({ value, onChange }: CompanySloganProps) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography gutterBottom>Khẩu hiệu</Typography>
      <TextField
        fullWidth
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder='Khẩu hiệu của công ty bạn'
        inputProps={{ maxLength: 75 }}
        helperText={`${value.length} / 75`}
      />
    </Box>
  )
}
