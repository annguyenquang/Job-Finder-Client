import { usePDFDialogStore } from '@/stores'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

export const PDFDialog = () => {
  const pdfDialogStore = usePDFDialogStore()
  console.log(pdfDialogStore)
  return (
    <Dialog
      open={pdfDialogStore.open}
      onClose={pdfDialogStore.closePDFDialog}
      fullWidth
      maxWidth='md'
    >
      <DialogTitle>CV</DialogTitle>
      <DialogContent>
        {pdfDialogStore.pdfLink ? (
          <iframe
            src={`https://docs.google.com/gview?url=` + pdfDialogStore.pdfLink + `&embedded=true`}
            content-type='application/pdf'
            width='100%'
            height='500px'
          />
        ) : (
          'Opps, No PDF link provided'
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={pdfDialogStore.closePDFDialog}
          color='primary'
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
