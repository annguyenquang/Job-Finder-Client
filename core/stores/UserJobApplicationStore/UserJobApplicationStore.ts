import { UserJobApplication } from '@/models'
import { JobApplicationService } from '@/services'
import { create } from 'zustand'

type UserJobApplicationStoreStates = {
  jobApplications: UserJobApplication[]
  page: number
  pageSize: number
  total: number
}
type UserJobApplicationStoreActions = {
  loadJobApplications: (userId: string) => Promise<void>
  setPage: (page: number) => void
}
type UserJobApplicationStore = UserJobApplicationStoreStates & UserJobApplicationStoreActions

export const useUserJobApplicationStore = create<UserJobApplicationStore>((set, get) => ({
  jobApplications: [] as UserJobApplication[],
  page: 1,
  pageSize: 10,
  total: 0,
  setPage: (page: number) => {
    set(() => ({ page }))
  },
  loadJobApplications: async (userId: string) => {
    const params = {
      userId: userId,
      page: get().page,
      pageSize: get().pageSize
    }
    const res = await JobApplicationService.GetUserJobApplications(params)
    if (res) {
      set(() => ({
        jobApplications: res.data,
        total: res.total,
        page: res.pagination.page,
        pageSize: res.pagination.pageSize
      }))
    }
  }
}))
