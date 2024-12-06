import { AlertProps } from '@mui/material/Alert/Alert'
import { SnackbarProps } from '@mui/material/Snackbar'
import { create } from 'zustand'

type AlertStore = {
  snackbarSettings: SnackbarProps
  alertSettings: AlertProps
  close: () => void
  setSnackbarSettings: (settings: SnackbarProps) => void
  setAlertSettings: (settings: AlertProps) => void
  alert: (snackbarProps?: SnackbarProps, alertSettings?: AlertProps) => void
}

export const useAlertStore = create<AlertStore>((set, get) => ({
  snackbarSettings: {
    open: false,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'right'
    },
    onClose: () => set(() => ({ snackbarSettings: { ...get().snackbarSettings, open: false } })),
    autoHideDuration: 2000
  },
  alertSettings: {
    severity: 'info',
    elevation: 6
  },
  close: () => {
    set(() => ({ snackbarSettings: { ...get().snackbarSettings, open: false } }))
  },
  setSnackbarSettings: (settings: SnackbarProps) => {
    set(() => ({ snackbarSettings: settings }))
  },
  setAlertSettings: (settings: AlertProps) => {
    set(() => ({ alertSettings: settings }))
  },
  alert: (snackbarProps?: SnackbarProps, alertSettings?: AlertProps) => {
    if (snackbarProps) {
      set(() => ({ snackbarSettings: { ...snackbarProps, open: true, onClose: get().close } }))
    }
    if (alertSettings) {
      set(() => ({ alertSettings: alertSettings }))
    }
  }
}))
