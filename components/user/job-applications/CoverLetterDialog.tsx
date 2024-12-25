'use client'
import { useCoverLetterDialogStore } from '@/stores'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'

export const CoverLetterDialog = () => {
  const coverLetterStore = useCoverLetterDialogStore()
  return (
    <Dialog
      open={coverLetterStore.open}
      onClose={coverLetterStore.closeCoverLetterDialog}
      aria-labelledby='form-dialog-title'
      fullWidth={true}
      maxWidth='md'
    >
      <DialogTitle id='form-dialog-title'>Cover Letter</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          id='name'
          label='Cover Letter'
          type='text'
          fullWidth
          multiline
          rows={10}
          variant='outlined'
          value={coverLetterStore.coverLetter}
          aria-readonly={true}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={coverLetterStore.closeCoverLetterDialog}
          color='primary'
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}
