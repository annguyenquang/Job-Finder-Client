import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

type CompanyLogoProps = {
  value: File | null
  onChange: (file: File | null) => void
}

export function CompanyLogo({ value, onChange }: CompanyLogoProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.size <= 2 * 1024 * 1024) {
      // 2MB limit
      onChange(file)
    } else if (file) {
      alert('File size must be less than 2MB')
      e.target.value = ''
    }
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        variant='h6'
        gutterBottom
        fontWeight='medium'
        sx={{ fontSize: '1rem' }}
      >
        Hồ sơ công ty
      </Typography>

      <Box
        sx={{
          width: '120px',
          height: '120px',
          border: '2px dashed #ccc',
          borderRadius: '4px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          position: 'relative',
          '&:hover': {
            borderColor: '#999'
          }
        }}
        component='label'
      >
        <input
          type='file'
          hidden
          accept='.jpg,.jpeg,.png'
          onChange={handleFileChange}
        />

        {value ? (
          <Box
            component='img'
            src={URL.createObjectURL(value)}
            alt='Company logo preview'
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              p: 1
            }}
          />
        ) : (
          <Box
            component='div'
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Box
              component='span'
              sx={{ fontSize: '24px', color: '#ccc' }}
            >
              +
            </Box>
          </Box>
        )}
      </Box>

      <Box sx={{ mt: 1 }}>
        <Typography
          variant='body2'
          color='primary'
          sx={{ mb: 0.5 }}
        >
          Company Logo*
        </Typography>
        <Typography
          variant='caption'
          display='block'
          color='text.secondary'
        >
          Chỉ chấp nhận các định dạng: .jpg, .jpeg, .png
        </Typography>
        <Typography
          variant='caption'
          display='block'
          color='text.secondary'
        >
          Kích thước đề xuất: 120px x 120px
        </Typography>
        <Typography
          variant='caption'
          display='block'
          color='text.secondary'
        >
          Dung lượng tối đa: 2MB
        </Typography>
      </Box>
    </Box>
  )
}
