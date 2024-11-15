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

const JobCard: React.FC = () => {
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
        <Skeleton variant='rounded' sx={{ width: '100px', height: '100px' }} />
        <CardContent sx={{ width: '70%' }}>
          {/* Job Title Skeleton */}
          <Skeleton variant='text' sx={{ width: '80%', height: '1.5rem', marginBottom: '0.5rem' }} />
          {/* Company Name Skeleton */}
          <Skeleton variant='text' sx={{ width: '50%', height: '1rem', marginBottom: '0.3rem' }} />
          {/* Location Text Skeleton */}
          <Skeleton variant='text' sx={{ width: '40%', height: '1rem', marginBottom: '0.5rem' }} />
          {/* Chip Skeleton */}
          <Skeleton
            variant='rounded'
            sx={{
              width: '100px',
              height: '32px',
              borderRadius: '16px'
            }}
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
          <Typography gutterBottom variant='body2' sx={{ width: '20%', fontWeight: '700', color: 'primary' }}>
            <Skeleton />
          </Typography>
          <Stack marginLeft={2} direction='row' spacing={1}>
            <Skeleton variant='rectangular' width={40} height={24} sx={{ borderRadius: '12px' }} />
            <Skeleton variant='rectangular' width={40} height={24} sx={{ borderRadius: '12px' }} />
            <Skeleton variant='rectangular' width={40} height={24} sx={{ borderRadius: '12px' }} />
          </Stack>
        </Box>
      </div>
    </Card>
  )
}

export default JobCard
