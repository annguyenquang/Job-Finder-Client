import { create } from 'zustand'

type CoverLetterDialogStoreStates = {
  open: boolean
  coverLetter: string | null
}
type CoverLetterDialogStoreActions = {
  openCoverLetterDialog: (coverLetter: string) => void
  closeCoverLetterDialog: () => void
}
type CoverLetterDialogStore = CoverLetterDialogStoreStates & CoverLetterDialogStoreActions

export const useCoverLetterDialogStore = create<CoverLetterDialogStore>((set, get) => ({
  open: false,
  coverLetter: '',
  openCoverLetterDialog: (coverLetter: string) => {
    set(() => ({
      coverLetter: coverLetter,
      open: true
    }))
  },
  closeCoverLetterDialog: () => {
    set(() => ({
      open: false
    }))
  }
}))
