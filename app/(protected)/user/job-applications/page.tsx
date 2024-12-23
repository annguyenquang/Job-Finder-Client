import React from 'react'
import { UserJobApplicationsTable } from '@/components'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

const UserJobApplicationsPage = () => {
  return (
    <Stack>
      <Typography
        variant='h5'
        fontWeight={'bold'}
      >
        Đơn ứng tuyển của tôi
      </Typography>
      <UserJobApplicationsTable />
    </Stack>
  )
}

export default UserJobApplicationsPage
