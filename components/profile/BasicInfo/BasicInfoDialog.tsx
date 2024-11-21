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

const BasicInfoDialog: React.FC<{ user: UserAccount | null; isOpen: boolean; onClose: () => void }> = (props) => {
  return (
    <Dialog
      open={props.isOpen}
      onClose={props.onClose}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Thông tin cơ bản
          <IconButton>
            <Close />
          </IconButton>
        </Box>
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
              label='Tên'
              type='text'
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              required
              label='Tên lót và họ'
              type='text'
            />
          </Grid2>
          <Grid2 size={12}>
            <Stack>
              <TextField
                fullWidth
                required
                label='Số điện thoại'
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
              <Typography fontWeight={'bold'}>{props.user?.email}</Typography>
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
            <TextField
              fullWidth
              required
              label='Ngày sinh'
              type='date'
              slotProps={{
                input: {
                  startAdornment: <></>
                }
              }}
            ></TextField>
          </Grid2>
        </Grid2>
      </DialogContent>
      <DialogActions>
        <Button
          variant='outlined'
          sx={{ color: [grey[500]], borderColor: [grey[500]], textTransform: 'none' }}
        >
          Hủy
        </Button>
        <Button
          variant='contained'
          sx={{ textTransform: 'none' }}
        >
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default BasicInfoDialog
