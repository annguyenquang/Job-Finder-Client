'use client'

import React from 'react'
import { useAlertStore } from '@/stores'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

export const NotificationSnackBar: React.FC = () => {
  const alertStore = useAlertStore()
  return (
    <Snackbar {...alertStore.snackbarSettings}>
      <Alert {...alertStore.alertSettings}></Alert>
    </Snackbar>
  )
}
