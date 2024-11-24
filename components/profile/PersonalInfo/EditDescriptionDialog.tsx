import React from 'react'
import Close from '@mui/icons-material/Close'
import Box from '@mui/material/Box/Box'
import Button from '@mui/material/Button/Button'
import grey from '@mui/material/colors/grey'
import Dialog from '@mui/material/Dialog/Dialog'
import DialogActions from '@mui/material/DialogActions/DialogActions'
import DialogContent from '@mui/material/DialogContent/DialogContent'
import DialogContentText from '@mui/material/DialogContentText/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle/DialogTitle'
import Divider from '@mui/material/Divider/Divider'
import IconButton from '@mui/material/IconButton/IconButton'
import TextField from '@mui/material/TextField/TextField'
import Typography from '@mui/material/Typography/Typography'

const MAX_DESCRIPTION_LENGTH = 2600

type EditDescriptionDiaglogProps = {
  description: string
  isOpen: boolean
  onClose: () => void
}
export const EditDescriptionDiaglog: React.FC<EditDescriptionDiaglogProps> = (props) => {
  const [description, setDescription] = React.useState<string>(props.description)

  const onClose = () => {
    setDescription(props.description)
    props.onClose()
  }
  const onDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > MAX_DESCRIPTION_LENGTH) return
    setDescription(event.target.value)
  }
  const onSave = () => {
    console.log(description)
  }

  React.useEffect(() => {
    setDescription(props.description)
  }, [])

  return (
    <Dialog
      open={props.isOpen}
      onClose={onClose}
    >
      <DialogTitle>
        <Box sx={{ fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography
            variant='h6'
            sx={{ fontWeight: 'bold' }}
          >
            Giới thiệu bản thân
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
        <Divider></Divider>
      </DialogTitle>
      <DialogContent>
        <DialogContentText variant='subtitle1'>
          Giới thiệu về bản thân mình để Nhà tuyển dụng hiểu bạn hơn
        </DialogContentText>
        <Box sx={{ position: 'relative' }}>
          <TextField
            value={description}
            fullWidth
            multiline
            onChange={onDescriptionChange}
            rows={4}
          />
          <Typography
            variant='caption'
            color='textSecondary'
            style={{
              position: 'absolute',
              right: 10,
              bottom: 10,
              background: 'rgba(255, 255, 255, 0.8)',
              pointerEvents: 'none'
            }}
          >
            {description.length}/{MAX_DESCRIPTION_LENGTH}
          </Typography>
        </Box>
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
          onClick={onSave}
        >
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  )
}
