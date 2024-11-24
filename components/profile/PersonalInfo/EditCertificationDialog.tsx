import React from 'react'
import { Certification } from '@/models'
import Dialog from '@mui/material/Dialog/Dialog'
import DialogTitle from '@mui/material/DialogTitle/DialogTitle'
import Box from '@mui/material/Box/Box'
import Typography from '@mui/material/Typography/Typography'
import IconButton from '@mui/material/IconButton/IconButton'
import Close from '@mui/icons-material/Close'
import Divider from '@mui/material/Divider/Divider'
import DialogContent from '@mui/material/DialogContent/DialogContent'
import Stack from '@mui/material/Stack/Stack'
import TextField from '@mui/material/TextField/TextField'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker/DatePicker'
import FormControl from '@mui/material/FormControl/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel'
import Checkbox from '@mui/material/Checkbox/Checkbox'
import DialogActions from '@mui/material/DialogActions/DialogActions'
import Button from '@mui/material/Button/Button'
import grey from '@mui/material/colors/grey'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3/AdapterDateFnsV3'
import { enGB } from 'date-fns/locale/en-GB'

const MAX_ADDITIONAL_INFO_LENGTH = 2600
export const EditCertificationDialog: React.FC<{
  isOpen: boolean
  onClose: () => void
  certification: Certification | null
}> = (props) => {
  const [name, setName] = React.useState<string>('')
  const [issuingOrganization, setIssuingOrganization] = React.useState<string>('')
  const [issueDate, setIssueDate] = React.useState<Date | null>(null)
  const [expirationDate, setExpirationDate] = React.useState<Date | null>(null)
  const [additionalInfo, setAdditionalInfo] = React.useState<string>('')
  const onClose = () => {
    props.onClose()
  }
  const onAdditionalInfoChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.target.value.length > MAX_ADDITIONAL_INFO_LENGTH) return
    setAdditionalInfo(event.target.value)
  }
  React.useEffect(() => {
    if (props.certification) {
      setName(props.certification.name)
      setIssuingOrganization(props.certification.issuingOrganization)
      setIssueDate(props.certification.issueDate ?? null)
      setExpirationDate(props.certification.expirationDate ?? null)
    }
  }, [])
  return (
    <Dialog
      fullWidth
      open={props.isOpen}
      onClose={onClose}
    >
      <DialogTitle>
        <Box sx={{ fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography
            variant='h6'
            sx={{ fontWeight: 'bold' }}
          >
            Chỉnh sửa chứng chỉ
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
        <Divider></Divider>
      </DialogTitle>
      <DialogContent>
        <Stack
          padding={2}
          spacing={2}
        >
          <TextField
            value={name}
            label='Tên chứng chỉ'
            required
          ></TextField>
          <TextField
            value={issuingOrganization}
            label='Tổ chức cấp'
            required
          ></TextField>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={enGB}
          >
            <DatePicker
              value={issueDate}
              label='Ngày cấp'
            ></DatePicker>
          </LocalizationProvider>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={enGB}
          >
            <DatePicker
              label='Ngày hết hạn'
              value={expirationDate}
            ></DatePicker>
          </LocalizationProvider>
          <FormControl>
            <FormControlLabel
              label={<Typography variant='overline'>Chứng chỉ này là vô hạn</Typography>}
              control={<Checkbox sx={{ borderWidth: 1 }} />}
            ></FormControlLabel>
          </FormControl>
          <Box position={'relative'}>
            <TextField
              fullWidth
              multiline
              label='Thông tin bổ sung (Tùy chọn)'
              rows={4}
              value={additionalInfo}
              onChange={onAdditionalInfoChange}
            ></TextField>
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
              {additionalInfo.length}/{MAX_ADDITIONAL_INFO_LENGTH}
            </Typography>
          </Box>
        </Stack>
      </DialogContent>
      <Divider></Divider>
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
          // onClick={onSave}
        >
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  )
}
