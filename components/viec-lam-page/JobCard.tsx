'use client'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Divider, Stack, Typography } from '@mui/material'
import React from 'react'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import { Job } from '@/models'
import { useRouter } from 'next/navigation'
import { getProvinceName } from '../../core/utils/LocationUtils'
type JobCardProps = {
  job: Job
}
const JobCard: React.FC<JobCardProps> = (props) => {
  const router = useRouter()
  const location = getProvinceName(props.job.company.provinceId)
  return (
    <Card
      className='flex flex-col p-3 '
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
          sx={{ width: '30%', height: '40%', objectFit: 'contain' }}
          image={props.job.company.logo}
        ></CardMedia>

        <CardContent>
          <Typography
            sx={{ cursor: 'pointer', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            onClick={() => {
              router.push(`viec-lam/${props.job.id}`)
            }}
            gutterBottom
            className='text-lg text-primary font-bold'
            component='div'
          >
            {props.job.title}
          </Typography>
          <Typography variant='body1' className='text-primary'>
            {props.job.company.name}
          </Typography>
          <Typography variant='body2'>Company location</Typography>
          <Chip
            className='bg-primary text-text'
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
          <Typography gutterBottom variant='body2' sx={{ width: '30%', fontWeight: '700', color: 'primary' }}>
            Kĩ năng:
          </Typography>
          <Stack direction='row' spacing={1}>
            <Chip color='primary' label='Java' size='small' />
            <Chip label='SQL' size='small' />
            <Chip label='Angular' size='small' />
          </Stack>
        </Box>
      </div>
    </Card>
  )
}

export default JobCard
