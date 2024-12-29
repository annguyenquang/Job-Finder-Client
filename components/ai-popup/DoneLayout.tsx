import React from 'react'
import Box from '@mui/material/Box'

import Carousel from 'react-material-ui-carousel'

import { Chip, Stack, Typography } from '@mui/material'
import { useAccountStore, useAIStore } from '@/stores'
import { UserAccount } from '@/models'
import JobSuggestionCard from './JobSuggestionCard'
import { getProvinceName } from '../../core/utils/LocationUtils'
import { LocationService } from '@/services'
import { Job } from '../../core/models/JobModel/Job'
import { MoodBad as MoodBadIcon } from '@mui/icons-material'

const DoneLayout = () => {
  const AIPopupStore = useAIStore()
  const [index, setIndex] = React.useState(0)

  const AccountStore = useAccountStore()
  const skills = (AccountStore.account as UserAccount)?.skills
  const certifications = (AccountStore.account as UserAccount)?.certifications.map((e) => e.name)

  return (
    <Box
      sx={{
        borderRadius: '12px',
        minWidth: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px -2px rgba(0, 0, 0, 0.2)'
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '40%',
          padding: 2
        }}
      >
        <Typography sx={{ fontSize: '13px', fontWeight: '400', fontFamily: 'sans-serif', display: 'inline' }}>
          {AIPopupStore.overallExplanation}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%'
          }}
        >
          <Box
            sx={{
              p: 1,
              display: 'flex',
              flexDirection: 'row'
            }}
          >
            <Typography
              variant='body2'
              sx={{
                width: '100px', // Same fixed width as above
                fontWeight: '700',
                color: 'primary'
              }}
            >
              Your skills:
            </Typography>
            <Stack
              direction='row'
              spacing={1}
              sx={{
                flex: 1
              }}
            >
              {skills.map((e, i) => (
                <Chip
                  key={i}
                  label={e}
                  size='small'
                  color={i === 0 ? 'primary' : undefined}
                />
              ))}
            </Stack>
          </Box>

          <Box
            sx={{
              p: 1,
              display: 'flex',
              flexDirection: 'row'
            }}
          >
            <Typography
              variant='body2'
              sx={{ width: '100px', fontWeight: '700', color: 'primary' }}
            >
              Certificates:
            </Typography>
            <Stack
              direction='row'
              spacing={1}
              sx={{
                display: 'inline-flex',
                flex: 1,
                overflowX: 'auto',
                whiteSpace: 'nowrap',
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': {
                  display: 'none'
                }
              }}
            >
              {certifications.map((e, i) => (
                <Chip
                  key={i}
                  label={e}
                  size='small'
                  color={i === 0 ? 'primary' : undefined}
                />
              ))}
            </Stack>
          </Box>

          <Box
            sx={{
              p: 1,
              display: 'flex',
              flexDirection: 'row'
            }}
          ></Box>
        </Box>
      </Box>

      <Box
        sx={{
          width: '100%',
          flex: 1,
          padding: 2,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', // Adds depth
          borderRadius: '16px', // Rounds the corners
          overflow: 'hidden', // Keeps the content tidy
          backgroundColor: '#ffffff' // Sets a background color for the carousel
        }}
      >
        <div>
          <Carousel
            index={index}
            interval={4000}
            animation='slide'
            indicators={false}
            stopAutoPlayOnHover
            swipe
            className='w-[100%] h-[100%]'
          >
            {AIPopupStore.suggestionJobs.length > 0 ? (
              <Carousel
                index={index}
                interval={4000}
                animation='slide'
                indicators={false}
                stopAutoPlayOnHover
                swipe
                className='w-[100%] h-[100%]'
              >
                {AIPopupStore.suggestionJobs.map((item, i) => (
                  <JobSuggestionCard
                    key={item.job?.id}
                    job={item.job}
                    Explanation={item.detailExplanation}
                    provinceId={item.job?.provinceId}
                  />
                ))}
              </Carousel>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  padding: 4
                }}
              >
                <MoodBadIcon sx={{ fontSize: '64px', color: 'rgba(0, 0, 0, 0.3)', marginBottom: 2 }} />
                <Typography
                  variant='h6'
                  sx={{ fontWeight: '500', color: 'rgba(0, 0, 0, 0.6)', textAlign: 'center' }}
                >
                  No suitable jobs found
                </Typography>
              </Box>
            )}
          </Carousel>
        </div>
      </Box>
    </Box>
  )
}

export default DoneLayout
