import React from 'react'
import { Stack, Typography } from '@mui/material'
import { UserJobApplicationsTable } from '@/components'

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
