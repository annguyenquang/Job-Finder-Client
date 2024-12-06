import * as React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid2 from '@mui/material/Grid2'
import IconButton from '@mui/material/IconButton'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import SchoolIcon from '@mui/icons-material/School'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import { Job } from '@/models'
import { District, LocationService, Province } from '@/services'
import { useApplicationDialogStore } from '@/stores'

type BannerProps = {
  job: Job
  educationLevel: string
  commitmentType: string
  workExperienceRequirement: string
  workArrangement: string
}

const getTimeSince = (date: Date) => {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()

  // Convert ms difference to days, hours, minutes, and seconds
  const days = Math.floor(diffMs / (1000 * 3600 * 24))
  const hours = Math.floor((diffMs % (1000 * 3600 * 24)) / (1000 * 3600))
  const minutes = Math.floor((diffMs % (1000 * 3600)) / (1000 * 60))
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000)

  if (days > 0) {
    return `${days} ngày trước`
  } else if (hours > 0) {
    return `${hours} giờ trước`
  } else if (minutes > 0) {
    return `${minutes} phút trước`
  } else {
    return `${seconds} giây trước`
  }
}

export const JobBanner: React.FC<BannerProps> = (props) => {
  const applicationDialogStore = useApplicationDialogStore()
  const [district, setDistrict] = React.useState<District>()
  const [province, setProvince] = React.useState<Province>()
  const [timeSince, setTimeSince] = React.useState<string | null>(null)

  const toggleDialog = () => {
    const currentState = applicationDialogStore.isOpen
    applicationDialogStore.setJob(props.job)
    applicationDialogStore.setIsOpen(!currentState)
  }

  React.useEffect(() => {
    const fetchProvince = async () => {
      const fetchedProvince = await LocationService.getProvinceById(props.job.provinceId)
      if (fetchedProvince) {
        setProvince(fetchedProvince)
      }
    }
    fetchProvince()
  }, [props.job.provinceId])

  React.useEffect(() => {
    const fetchDistrict = async () => {
      const fetchedDistrict = await LocationService.getDistrictById(props.job.districtId)
      if (fetchedDistrict) {
        setDistrict(fetchedDistrict)
      }
    }
    fetchDistrict()
  }, [props.job.districtId])

  React.useEffect(() => {
    if (props.job.createdAt) {
      // Set initial timeSince value
      setTimeSince(getTimeSince(new Date(props.job.createdAt)))

      // Update timeSince every second
      const interval = setInterval(() => {
        setTimeSince(getTimeSince(new Date(props.job.createdAt)))
      }, 1000)

      return () => clearInterval(interval) // Clear interval on unmount
    }
  }, [props.job.createdAt])

  return (
    <Grid2
      container
      spacing={2}
      className='m-0'
    >
      <Grid2
        size={8}
        className='flex-1'
      >
        <Box>
          <Typography
            className='font-bold font-sans text-white mt-4'
            variant='h4'
          >
            {props.job.title || 'Tên công việc'}
          </Typography>
          <Box className='flex flex-row items-center mt-6'>
            <AttachMoneyIcon
              fontSize='medium'
              className='text-colorPrimaryText mr-1 font-semibold'
            ></AttachMoneyIcon>
            <Typography className='font-sans font-semibold text-lg text-colorPrimaryText'>
              {props.job.salary !== null ? `${props.job.salary} Tr/Tháng` : 'Thỏa thuận'}
            </Typography>
          </Box>
          <Box className='flex flex-row items-center mt-1'>
            <Box className='flex flex-row items-center mr-6'>
              <BusinessCenterIcon
                fontSize='medium'
                className='text-colorPrimaryText mr-1 font-semibold'
              ></BusinessCenterIcon>
              <Typography className='font-sans text-lg text-white'>
                {props.workExperienceRequirement ? `${props.workExperienceRequirement}` : 'Không yêu cầu kinh nghiệm'}
              </Typography>
            </Box>
            <Box className='flex flex-row items-center'>
              <SchoolIcon
                fontSize='medium'
                className='text-colorPrimaryText mr-1 font-semibold'
              ></SchoolIcon>
              <Typography className='font-sans text-lg text-white'>
                {props.educationLevel ? `${props.educationLevel}` : 'Không yêu cầu trình độ'}
              </Typography>
            </Box>
          </Box>
          <Box className='flex flex-row items-center mt-1'>
            <LocationOnIcon
              fontSize='medium'
              className='text-colorPrimaryText mr-1 font-semibold'
            ></LocationOnIcon>
            <Typography className='font-sans text-lg text-white'>
              {district?.name || province?.name
                ? `${district?.name ? `${district?.name}, ` : ''}${province?.name ? `${province?.name} · ` : ''}`
                : 'Công ty không công khai thông tin này'}
              {props.workArrangement ? `${props.workArrangement} · ` : ''}
              {props.commitmentType ? props.commitmentType : ''}
            </Typography>
          </Box>
          <Box className='flex-1 flex mt-2 flex-row justify-between'>
            <Typography className='font-sans text-base text-green-400 mt-1 pb-6'>
              Cập nhật {timeSince ?? 'N/A'}
            </Typography>
            <Typography className='font-sans text-base text-green-400 mt-1 mb-6 whitespace-nowrap'>
              Ứng tuyển trước ngày: {new Date(props.job.closeDate).toLocaleDateString('Vi-VN')}
            </Typography>
          </Box>
        </Box>
      </Grid2>
      <Grid2
        size={4}
        className='flex justify-end items-end p-4'
      >
        <Box className='flex flex-row justify-end items-center'>
          <IconButton>
            <BookmarkBorderIcon
              fontSize='large'
              className='text-white'
            ></BookmarkBorderIcon>
          </IconButton>
          <IconButton className='mr-4'>
            <ShareOutlinedIcon
              fontSize='large'
              className='text-white'
            ></ShareOutlinedIcon>
          </IconButton>
          <Button
            onClick={toggleDialog}
            className='text-white bg-orange-600 pt-2 pb-2 pl-4 pr-4 font-bold '
            size='medium'
            variant='contained'
          >
            Ứng tuyển nhanh
          </Button>
        </Box>
      </Grid2>
    </Grid2>
  )
}
