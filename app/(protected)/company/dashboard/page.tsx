import { CheckCircle, SwapVert } from '@mui/icons-material'
import Search from '@mui/icons-material/Search'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  InputAdornment,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material'
import { green } from '@mui/material/colors'
import Image from 'next/image'

const CompanyPage: React.FC = () => {
  return (
    <Stack>
      <Box padding={1}>
        <BasicCompanyInfo />
      </Box>
      <Box padding={1}>
        <JobList />
      </Box>
    </Stack>
  )
}

const JobList: React.FC = () => {
  return (
    <Stack>
      <Typography variant='h6'>Danh sách tin</Typography>
      <Box position={'relative'}>
        <TextField
          size='small'
          sx={{ width: '45%' }}
          placeholder='Tìm kiếm công việc'
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position='start'>
                  <Search></Search>
                </InputAdornment>
              )
            }
          }}
        />

        <Button
          variant='outlined'
          sx={{ position: 'absolute', right: 0, fontWeight: 'bold' }}
          startIcon={<SwapVert></SwapVert>}
        >
          Sắp xếp theo:{' '}
        </Button>

        <TabContext value={2}>
          <TabList>
            <Tab
              label='Tất cả tin'
              value='0'
            />
            <Tab
              label='Tin đang hoạt động'
              value='1'
            />
            <Tab
              label='Tin hết hạn'
              value='2'
            />
          </TabList>
          <TabPanel value={0}>ITem1</TabPanel>
          <TabPanel value={1}>ITem2</TabPanel>
          <TabPanel value={2}>ITem3</TabPanel>
        </TabContext>
      </Box>
    </Stack>
  )
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
          <Typography
            variant='h5'
            fontWeight={'bold'}
          >
            AN
          </Typography>
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
