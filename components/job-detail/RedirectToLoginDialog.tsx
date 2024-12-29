'use client'

import { Button, DialogActions, DialogContent, DialogContentText } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import { useRouter } from 'next/navigation'
type RedirectToLoginDialogProps = {
  open: boolean
  onClose: () => void
}

const RedirectToLoginDialog: React.FC<RedirectToLoginDialogProps> = (props) => {
  const router = useRouter()

  const navigateToLoginPage = () => {
    router.push('/login')
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
    >
      <DialogContent>
        <DialogContentText
          textAlign={'center'}
          variant='h5'
        >
          Bạn phải đăng nhập để tiếp tục
        </DialogContentText>

        <DialogActions sx={{ marginTop: 2 }}>
          <Button
            variant='contained'
            onClick={navigateToLoginPage}
          >
            Tới trang login
          </Button>
          <Button onClick={props.onClose}>Đóng</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

export default RedirectToLoginDialog
