import { Box, Skeleton, Stack, TableCell, TableRow } from '@mui/material'
import React from 'react'

export const TableRowSkeleton = () => {
  return (
    <TableRow>
      <TableCell
        component='th'
        scope='row'
      >
        <Stack
          direction='row'
          alignItems='center'
          spacing={2}
        >
          {/* Skeleton Avatar */}
          <Skeleton
            variant='circular'
            width={40}
            height={40}
            animation='wave'
          />

          {/* Skeleton User Details */}
          <Stack>
            <Skeleton
              variant='text'
              width={120}
              height={20}
              animation='wave'
            />
            <Skeleton
              variant='text'
              width={80}
              height={16}
              animation='wave'
            />
          </Stack>
        </Stack>
      </TableCell>

      <TableCell align='center'>
        {/* Skeleton for Cover Letter */}
        <Skeleton
          variant='text'
          width='80%'
          height={20}
          animation='wave'
        />
      </TableCell>

      <TableCell align='center'>
        {/* Skeleton for Attach File Icon */}
        <Skeleton
          variant='circular'
          width={24}
          height={24}
          animation='wave'
        />
      </TableCell>

      <TableCell align='center'>
        {/* Skeleton for Date */}
        <Skeleton
          variant='text'
          width={60}
          height={20}
          animation='wave'
        />
      </TableCell>

      <TableCell align='center'>
        {/* Skeleton for Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
          <Skeleton
            variant='circular'
            width={30}
            height={30}
            animation='wave'
          />
          <Skeleton
            variant='rectangular'
            width={30}
            height={30}
            animation='wave'
          />
        </Box>
      </TableCell>
    </TableRow>
  )
}
