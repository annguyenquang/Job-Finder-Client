'use client'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Grid2 from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import SchoolIcon from '@mui/icons-material/School'
import React from 'react'
import { useJobDetailStore, useMetadataStore } from '@/stores'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import CircularProgress from '@mui/material/CircularProgress'

export const JobList: React.FC = () => {
  const jobDetailStore = useJobDetailStore()
  const metadataStore = useMetadataStore()
  const { id } = useParams()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  React.useEffect(() => {
    const loadRelativeJobs = async () => {
      if (jobDetailStore.relativeJobs.length > 0) return
      setIsLoading(true)
      await jobDetailStore.loadRelativeJobs(id as string)
      setIsLoading(false)
    }
    loadRelativeJobs()
  }, [id])

  React.useEffect(() => {
    metadataStore.loadMetadataByEducationLevel()
  }, [])

  return (
    <Box>
      <Typography
        variant='h5'
        className='font-sans font-semibold text-black mb-4'
      >
        Công việc tương tự
      </Typography>
      {isLoading && <CircularProgress />}
      {!isLoading &&
        jobDetailStore.relativeJobs.map((job) => (
          <Grid2
            spacing={2}
            container
            border={1}
            key={job.title}
            className='flex flex-row rounded cursor-pointer text-gray-300 p-2 mb-4'
          >
            <Grid2
              size={2}
              className='flex flex-col'
            >
              <Box className='-mr-2'>
                <img
                  alt=''
                  className='w-full h-full'
                  src={job.company.logo}
                ></img>
              </Box>
            </Grid2>
            <Grid2
              size={10}
              className='flex flex-col'
            >
              <Link href={`/job-detail/${job.id}`}>
                <Typography className='text-base font-semibold text-black hover:underline hover:text-blue-500'>
                  {job.title}
                </Typography>
              </Link>
              <Typography className='text-sm text-blue-500'>{job.company.name}</Typography>
              <Box className='flex flex-row items-center mt-1'>
                <LocationOnIcon className='text-gray-500 text-xs mr-1'></LocationOnIcon>
                <Typography className='text-xs text-black'>{job.company.address}</Typography>
              </Box>
              <Box className='flex flex-row items-center mt-1'>
                <AttachMoneyIcon className='text-gray-500 text-xs mr-1'></AttachMoneyIcon>
                <Typography className='text-xs text-black'>{job.salary}</Typography>
              </Box>
              <Box className='flex flex-row items-center mt-1'>
                <SchoolIcon className='text-gray-500 text-xs mr-1'></SchoolIcon>
                <Typography className='text-xs text-black'>
                  {
                    metadataStore.listEducationLevel.find((metadata) => metadata.id == job.educationLevelRequirement.id)
                      ?.value
                  }
                </Typography>
              </Box>
            </Grid2>
            <Box className='flex flex-col w-full'>
              <Divider variant='fullWidth' />
              <Typography
                variant='caption'
                className='text-gray-500 mt-2'
              >
                {job.updatedAt?.toISOString()}
              </Typography>
            </Box>
          </Grid2>
        ))}
    </Box>
  )
}
