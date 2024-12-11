import React from 'react'
import Box from '@mui/material/Box'

import { Skeleton, Stack, Typography } from '@mui/material'

const DoneLayoutSkeleton = () => {
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
        <Typography sx={{ fontSize: '70px', fontWeight: '400', fontFamily: 'sans-serif', display: 'inline' }}>
          <Skeleton />
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
              flexDirection: 'row',
              gap: 4
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
              <Skeleton />
            </Typography>
            <Stack
              direction='row'
              spacing={1}
              sx={{
                flex: 1
              }}
            >
              <Skeleton
                variant='rectangular'
                width={40}
                height={24}
                sx={{ borderRadius: '12px' }}
              />
              <Skeleton
                variant='rectangular'
                width={40}
                height={24}
                sx={{ borderRadius: '12px' }}
              />
              <Skeleton
                variant='rectangular'
                width={40}
                height={24}
                sx={{ borderRadius: '12px' }}
              />
            </Stack>
          </Box>

          <Box
            sx={{
              p: 1,
              display: 'flex',
              flexDirection: 'row',
              gap: 4
            }}
          >
            <Typography
              variant='body2'
              sx={{ width: '100px', fontWeight: '700', color: 'primary' }}
            >
              <Skeleton />
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
              <Skeleton
                variant='rectangular'
                width={40}
                height={24}
                sx={{ borderRadius: '20px' }}
              />
              <Skeleton
                variant='rectangular'
                width={40}
                height={24}
                sx={{ borderRadius: '20px' }}
              />
            </Stack>
          </Box>

          <Box
            sx={{
              p: 1,
              display: 'flex',
              flexDirection: 'row',
              gap: 4
            }}
          >
            <Typography
              variant='body2'
              sx={{ width: '100px', fontWeight: '700', color: 'primary' }}
            >
              <Skeleton />
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
              <Skeleton
                variant='rectangular'
                width='40%'
                height={24}
                sx={{ borderRadius: '12px' }}
              />
              <Skeleton
                variant='rectangular'
                width='40%'
                height={24}
                sx={{ borderRadius: '12px' }}
              />
            </Stack>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          width: '100%',
          p: 2,
          height: '60%'
        }}
      >
        <Skeleton
          height={'100%'}
          sx={{
            height: '100%'
          }}
        />
      </Box>
    </Box>
  )
}

export default DoneLayoutSkeleton
