'use client'
import { Box, Card, CardContent, CardMedia, Chip, Divider, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import { Job } from '@/models'
import { useRouter } from 'next/navigation'
import { useJobListStore } from '@/stores'
import { LocationService } from '@/services'
type JobCardProps = {
  job: Job | undefined
  Explanation: string
  provinceId: number | undefined
}
const JobSuggestionCard: React.FC<JobCardProps> = (props) => {
  const [location, setLocation] = useState<string | undefined>('')
  const router = useRouter()
  const jobStore = useJobListStore()

  const getProvince = async (pId: number) => {
    const province = await LocationService.getProvinceById(pId)
    setLocation(province?.name)
  }

  useEffect(() => {
    if (props.provinceId) getProvince(props.provinceId)
  }, [])

  const handleOpenJobdetail = () => {
    setTimeout(() => {
      router.push(`/job-detail/${props.job?.id}`)
    }, 500)
  }
  return (
    <Card
      onClick={handleOpenJobdetail}
      className='flex flex-col p-5 cursor-pointer'
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
          image={props.job?.company.logo}
        ></CardMedia>
        <CardContent>
          <Typography
            sx={{ cursor: 'pointer', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            gutterBottom
            className='text-colorPrimary font-bold'
            component='div'
          >
            {props.job?.title}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px', // Space between rows
              width: '100%'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center' // Vertically align content
              }}
            >
              <Typography
                sx={{
                  fontSize: '15px',
                  fontWeight: '600',
                  fontFamily: 'sans-serif',
                  width: '100px' // Fixed width for the label
                }}
              >
                Company:
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: '400',
                  fontFamily: 'sans-serif',
                  flex: 1 // Flexible width for the content
                }}
              >
                {props.job?.company.name}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center' // Vertically align content
              }}
            >
              <Typography
                sx={{
                  fontSize: '15px',
                  fontWeight: '600',
                  fontFamily: 'sans-serif',
                  width: '100px' // Same fixed width as above
                }}
              >
                Contact:
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: '400',
                  fontFamily: 'sans-serif',
                  flex: 1 // Flexible width for the content
                }}
              >
                {props.job?.company.emailContact}
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center' // Vertically align content
              }}
            >
              <Typography
                sx={{
                  fontSize: '15px',
                  fontWeight: '600',
                  fontFamily: 'sans-serif',
                  width: '100px' // Same fixed width as above
                }}
              >
                Salary:
              </Typography>
              <Chip
                className='bg-colorPrimary text-text'
                icon={<MonetizationOnIcon sx={{ fill: 'white' }} />}
                label={props.job?.salary}
                size='small'
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center' // Vertically align content
              }}
            >
              <Typography
                sx={{
                  fontSize: '15px',
                  fontWeight: '600',
                  fontFamily: 'sans-serif',
                  width: '100px' // Same fixed width as above
                }}
              >
                Location:
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: '400',
                  fontFamily: 'sans-serif',
                  flex: 1 // Flexible width for the content
                }}
              >
                {location}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </div>

      <div>
        <Divider />
        <Box
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'row',
            gap: 3
          }}
        >
          <Typography
            gutterBottom
            variant='body2'
            sx={{ width: '30%', fontWeight: '700', color: 'primary' }}
          >
            Explanation:
          </Typography>
          <Stack
            direction='row'
            spacing={1}
          >
            <Typography
              sx={{
                fontSize: '13px',
                fontWeight: '400',
                fontFamily: 'sans-serif',
                display: 'inline'
              }}
            >
              {props.Explanation}
            </Typography>
          </Stack>
        </Box>
      </div>
    </Card>
  )
}

export default JobSuggestionCard
