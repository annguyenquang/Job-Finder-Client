import { UserJobApplication } from '@/models'
import { JobApplicationService } from '@/services'
import { create } from 'zustand'

type UserJobApplicationStoreStates = {
  jobApplications: UserJobApplication[]
}
type UserJobApplicationStoreActions = {
  loadJobApplications: (userId: string) => Promise<void>
}
type UserJobApplicationStore = UserJobApplicationStoreStates & UserJobApplicationStoreActions

export const useUserJobApplicationStore = create<UserJobApplicationStore>((set, get) => ({
  jobApplications: [] as UserJobApplication[],
  loadJobApplications: async (userId: string) => {
    const res = await JobApplicationService.GetUserJobApplications(userId)
    if (res) {
      set(() => ({
        jobApplications: (res as any).data
      }))
    }
  }
}))
