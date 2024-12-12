import { CheckCircle } from '@mui/icons-material'
import { Box, Button, ButtonGroup, Divider, Stack, Typography } from '@mui/material'
import { green } from '@mui/material/colors'
import Image from 'next/image'

const CompanyPage: React.FC = () => {
  return <BasicCompanyInfo />
}

const BasicCompanyInfo: React.FC = () => {
  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <Stack
        direction={'row'}
        spacing={1}
      >
        <Image
          alt='company-logo'
          height={'100'}
          width={'100'}
          src={'https://dummyimage.com/600x400/b2de2c/422ba1.png&text=yabox'}
        />

        <Divider orientation={'vertical'} />

        <Stack direction={'column'}>
          <Typography variant='h6'>AN</Typography>
          <Stack
            direction={'row'}
            spacing={1}
          >
            <CheckCircle sx={{ color: green[500] }}></CheckCircle>
            <Typography variant='subtitle1'>Công ty đã được xác minh</Typography>
          </Stack>
        </Stack>
      </Stack>
      <ButtonGroup
        sx={{ display: 'flex', alignItems: 'center' }}
        size='small'
      >
        <Button sx={{ borderWidth: '2px', fontWeight: 'bold', height: 'fit-content' }}>Chỉnh sửa hồ sơ công ty</Button>
        <Button sx={{ borderWidth: '2px', fontWeight: 'bold', height: 'fit-content' }}>Quản lý thành viên</Button>
      </ButtonGroup>
    </Box>
  )
}

export default CompanyPage
