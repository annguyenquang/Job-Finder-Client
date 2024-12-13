import React from 'react'
import Box from '@mui/material/Box'

import Carousel from 'react-material-ui-carousel'

import { Chip, Stack, Typography } from '@mui/material'
import { useAccountStore } from '@/stores'
import { useAIStore } from '@/stores/AIPopupStore'
import { UserAccount } from '@/models'
import JobSuggestionCard from './JobSuggestionCard'

export function DoneLayout() {
  const AIPopupStore = useAIStore()
  function Item({ item }: { item: { description: string } }) {
    return <div style={{ width: '100%', height: '100%' }}>{item.description}</div>
  }

  const [index, setIndex] = React.useState(0)

  const handleChange = (cur: number, prev: number) => {
    setIndex(cur)
    console.log(cur, prev)
  }

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
          >
            <Typography
              variant='body2'
              sx={{ width: '100px', fontWeight: '700', color: 'primary' }}
            >
              Location:
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
              <Typography
                variant='body2'
                sx={{ width: '100px', color: 'primary' }}
              >
                Quận 3, TP. Hồ Chí Minh
              </Typography>
            </Stack>
          </Box>
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
            {AIPopupStore.suggestionJobs.map((item, i) => (
              <JobSuggestionCard
                key={item.job?.id}
                job={item.job}
                Explanation={item.detailExplanation}
              />
            ))}
          </Carousel>
        </div>
      </Box>
    </Box>
  )
}
