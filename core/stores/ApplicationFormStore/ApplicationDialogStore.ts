import { create } from 'zustand'
import { Job } from '@/models'
import { useAccountStore } from '@/stores'
import { JobApplicationService } from '@/services'

type ApplicationDialogStore = {
  job: Job | null
  isOpen: boolean
  cvFile: File | null
  phoneNumber: string | null
  hasCoverLetter: boolean
  coverLetter: string | null
  readonly setJob: (job: Job) => void
  readonly setIsOpen: (isOpen: boolean) => void
  readonly setCvFile: (file: File | null) => void
  readonly setPhoneNumber: (newPhone: string) => void
  readonly setHasCoverLetter: (newValue: boolean) => void
  readonly sendApplication: () => Promise<string | undefined>
  readonly setCoverLetter: (newValue: string) => void
}

export const useApplicationDialogStore = create<ApplicationDialogStore>()((set, get) => ({
  job: null,
  isOpen: false,
  cvFile: null,
  phoneNumber: null,
  hasCoverLetter: false,
  coverLetter: null,
  setJob: (job: Job) => {
    set(() => ({ job: job }))
  },
  setIsOpen: (isOpen: boolean) => {
    set(() => ({ isOpen: isOpen }))
  },
  setCvFile: (file: File | null) => {
    set(() => ({ cvFile: file }))
  },
  setPhoneNumber: (newPhone: string) => {
    set(() => ({ phoneNumber: newPhone }))
  },
  setHasCoverLetter: (newValue: boolean) => {
    set(() => ({ hasCoverLetter: newValue }))
  },
  setCoverLetter: (newValue) => {
    set(() => ({ coverLetter: newValue }))
  },
  sendApplication: async () => {
    const { job, cvFile, hasCoverLetter, coverLetter, phoneNumber } = get()
    const userId = useAccountStore.getState().account?.id
    if (!userId) {
      console.log('Can not find user, maybe not logged in')
      return
    }
    const res = await JobApplicationService.CreateJobApplication({
      userId: userId,
      jobId: job?.id ?? '',
      CVFile: cvFile,
      coverLetter: hasCoverLetter ? coverLetter : null,
      phoneNumber: phoneNumber
    })
    set(() => ({ isOpen: false }))
    return res
  }
}))
