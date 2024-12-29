import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

const companySizes = [1, 10, 100, 1000, 10_000, 100_000, 1_000_000, 10_000_000, 100_000_000, 1_000_000_000]

type CompanySizeProps = {
  value: number
  onChange: (size: number) => void
}

export function CompanySize({ value, onChange }: CompanySizeProps) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography gutterBottom>Quy mô công ty*</Typography>
      <TextField
        select
        fullWidth
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
      >
        {companySizes.map((size) => (
          <MenuItem
            key={size}
            value={size}
          >
            {'Khoảng ' + size + ' nhân viên'}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  )
}
