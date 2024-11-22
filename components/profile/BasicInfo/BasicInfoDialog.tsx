import React, { useEffect } from 'react'
import { UserAccount } from '@/models'
import Close from '@mui/icons-material/Close'
import Box from '@mui/material/Box/Box'
import Button from '@mui/material/Button/Button'
import blue from '@mui/material/colors/blue'
import grey from '@mui/material/colors/grey'
import Dialog from '@mui/material/Dialog/Dialog'
import DialogActions from '@mui/material/DialogActions/DialogActions'
import DialogContent from '@mui/material/DialogContent/DialogContent'
import DialogTitle from '@mui/material/DialogTitle/DialogTitle'
import Divider from '@mui/material/Divider/Divider'
import Grid2 from '@mui/material/Grid2/Grid2'
import IconButton from '@mui/material/IconButton/IconButton'
import Stack from '@mui/material/Stack/Stack'
import TextField from '@mui/material/TextField/TextField'
import Typography from '@mui/material/Typography/Typography'
import { enGB } from 'date-fns/locale/en-GB'
import { PickerChangeHandlerContext } from '@mui/x-date-pickers/models/pickers'
import { DateValidationError } from '@mui/x-date-pickers/models/validation'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3/AdapterDateFnsV3'
import { DatePicker } from '@mui/x-date-pickers/DatePicker/DatePicker'

const BasicInfoDialog: React.FC<{ user: UserAccount | null; isOpen: boolean; onClose: () => void }> = (props) => {
  const [user, setUser] = React.useState<UserAccount>(props.user as UserAccount)

  const onClose = () => {
    setUser(props.user as UserAccount)
    props.onClose()
  }
  const onSaveUser = () => {
    // Console.log for call api simulation
    console.log(user)
  }

  const onFirstNameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUser({
      ...user,
      firstName: event.target.value
    })
  }

  const onLastNameChangonLastName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUser({
      ...user,
      lastName: event.target.value
    })
  }

  const onPhoneChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUser({
      ...user,
      phone: event.target.value
    })
  }

  const onChangeDateOfBirth = (value: Date | null, context: PickerChangeHandlerContext<DateValidationError>) => {
    if (value) {
      setUser({
        ...user,
        dateOfBirth: value
      })
    }
  }

  return (
    <Dialog
      open={props.isOpen}
      onClose={onClose}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Thông tin cơ bản
          <IconButton onClick={props.onClose}>
            <Close />
          </IconButton>
        </Box>
        <Divider></Divider>
      </DialogTitle>
      <DialogContent>
        <Grid2
          container
          spacing={1}
          padding={1}
        >
          <Grid2 size={6}>
            <TextField
              fullWidth
              required
              value={user?.firstName}
              label='Tên'
              type='text'
              onChange={onFirstNameChange}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              required
              value={user?.lastName}
              label='Tên lót và họ'
              type='text'
              onChange={onLastNameChangonLastName}
            />
          </Grid2>
          <Grid2 size={12}>
            <Stack>
              <TextField
                fullWidth
                required
                label='Số điện thoại'
                value={user?.phone}
                type='number'
                sx={{ marginTop: 1 }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <Box sx={{ display: 'inline-flex' }}>
                        <Typography>+84</Typography>
                        <Divider
                          sx={{ opacity: 1, borderRightWidth: 2, marginX: 1 }}
                          variant='fullWidth'
                          orientation='vertical'
                          flexItem
                        ></Divider>
                      </Box>
                    )
                  }
                }}
                onChange={onPhoneChange}
              ></TextField>
              <Typography variant='caption'>
                Nhà tuyển dụng cần thông tin này để liên lạc với bạn nhanh chóng.
              </Typography>
              <Typography variant='overline'>Ví dụ: +84912345678</Typography>
            </Stack>
          </Grid2>
          <Grid2 size={12}>
            <Typography>
              Email{' '}
              <Typography
                color='red'
                sx={{ display: 'inline-block' }}
              >
                *
              </Typography>
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <Typography fontWeight={'bold'}>{user?.email}</Typography>
              <Typography
                sx={{
                  cursor: 'pointer',
                  color: blue[500]
                }}
              >
                Thay đổi
              </Typography>
            </Box>
          </Grid2>
          <Grid2
            container
            size={12}
          >
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={enGB}
            >
              <DatePicker
                label='Ngày sinh'
                sx={{ width: '100%' }}
                value={user?.dateOfBirth}
                onChange={onChangeDateOfBirth}
              ></DatePicker>
            </LocalizationProvider>
          </Grid2>
        </Grid2>
      </DialogContent>
      <DialogActions>
        <Button
          variant='outlined'
          sx={{ color: [grey[500]], borderColor: [grey[500]], textTransform: 'none' }}
          onClick={onClose}
        >
          Hủy
        </Button>
        <Button
          variant='contained'
          sx={{ textTransform: 'none' }}
          onClick={onSaveUser}
        >
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default BasicInfoDialog
