'use client'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Skeleton,
  Stack,
  Typography
} from '@mui/material'
import React from 'react'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import { Job } from '@/models'
import { useRouter } from 'next/navigation'
import { useJobListStore } from '@/stores'
type JobCardProps = {
  job: Job
}
const JobCard: React.FC<JobCardProps> = (props) => {
  const router = useRouter()
  const jobStore = useJobListStore()

  const handleOpenJobdetail = () => {
    setTimeout(() => {
      router.push(`job-detail/${props.job.id}`)
    }, 500)
  }
  return (
    <Card
      onClick={handleOpenJobdetail}
      className='flex flex-col p-3 cursor-pointer'
      sx={{
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          boxShadow: '0 4px 20px rgb(106 147 217 / var(--tw-bg-opacity))',
          transform: 'scale(1.02)'
        }
      }}
    >
      <div className='flex w-[100%] flex-row items-center'>
        <CardMedia
          sx={{ width: '100px', height: '32px', objectFit: 'contain' }}
          image={props.job.company.logo}
        ></CardMedia>
        <CardContent>
          <Typography
            sx={{ cursor: 'pointer', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            gutterBottom
            className='text-lg text-colorPrimary font-bold'
            component='div'
          >
            {props.job.title}
          </Typography>
          <Typography
            variant='body1'
            className='text-colorPrimary'
          >
            {props.job.company.name}
          </Typography>
          <Typography variant='body2'>
            Contact: <span>{props.job.company.emailContact}</span>
          </Typography>
          <Chip
            className='bg-colorPrimary text-text'
            icon={<MonetizationOnIcon sx={{ fill: 'white' }} />}
            label={props.job.salary}
            size='medium'
          />
        </CardContent>
      </div>

      <div>
        <Divider />
        <Box
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            alignContent: 'center'
          }}
        >
          <Typography
            gutterBottom
            variant='body2'
            sx={{ width: '30%', fontWeight: '700', color: 'primary' }}
          >
            Kĩ năng:
          </Typography>
          <Stack
            direction='row'
            spacing={1}
          >
            <Chip
              color='primary'
              label='Java'
              size='small'
            />
            <Chip
              label='SQL'
              size='small'
            />
            <Chip
              label='Angular'
              size='small'
            />
          </Stack>
        </Box>
      </div>
    </Card>
  )
}

export default JobCard
