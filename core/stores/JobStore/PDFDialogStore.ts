import { create } from 'zustand'

type PDFDialogStoreStates = {
  open: boolean
  pdfLink: string | null
}
type PDFDialogStoreActions = {
  openPDFDialog: (pdfLink: string) => void
  closePDFDialog: () => void
}
type PDFDialogStore = PDFDialogStoreStates & PDFDialogStoreActions

export const usePDFDialogStore = create<PDFDialogStore>((set) => ({
  open: false,
  pdfLink: '',
  openPDFDialog: (pdfLink: string) => {
    set(() => ({
      pdfLink: pdfLink,
      open: true
    }))
  },
  closePDFDialog: () => {
    set(() => ({
      open: false
    }))
  }
}))
