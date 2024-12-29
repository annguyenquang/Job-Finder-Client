import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

type CompanySlugProps = {
  value: string
  onChange: (slug: string) => void
}

function CompanySlug({ value, onChange }: CompanySlugProps) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography gutterBottom>Slug</Typography>
      <Typography
        variant='caption'
        gutterBottom
      >
        Slug là phần đuôi url của trang profile công ty, nhằm mục đích để khiến url dễ đọc hơn trong mắt người dùng{' '}
      </Typography>
      <Typography
        variant='caption'
        gutterBottom
      >
        Ví dụ: tnhh-an-bao-chanh
      </Typography>
      <TextField
        fullWidth
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder='tnhh-an-bao-chanh'
        slotProps={{
          input: {
            startAdornment: <Paper sx={{ px: 1, mr: 1 }}>/</Paper>
          }
        }}
      />
    </Box>
  )
}

export default CompanySlug
