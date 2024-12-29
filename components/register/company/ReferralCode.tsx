import { Box, Typography, TextField } from '@mui/material'

type ReferralCodeProps = {
  value: string
  onChange: (code: string) => void
}

export function ReferralCode({ value, onChange }: ReferralCodeProps) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography gutterBottom>Mã giới thiệu</Typography>
      <TextField
        fullWidth
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder='Nhập mã giới thiệu (nếu có)'
      />
    </Box>
  )
}
