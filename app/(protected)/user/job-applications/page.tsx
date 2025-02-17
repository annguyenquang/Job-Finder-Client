import React from 'react'
import { CoverLetterDialog, UserJobApplicationsTable } from '@/components'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const UserJobApplicationsPage = () => {
  return (
    <Stack p={2}>
      <Typography
        variant='h5'
        fontWeight={'bold'}
      >
        Đơn ứng tuyển của tôi
      </Typography>
      <CoverLetterDialog />
      <Box pt={2}>
        <UserJobApplicationsTable />
      </Box>
    </Stack>
  )
}

export default UserJobApplicationsPage
