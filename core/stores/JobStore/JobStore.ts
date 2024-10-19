import { Job } from '@/models'
import { JobService } from '@/services'
import { create } from 'zustand'

type JobStore = {
  jobs: Job[] // Rename to 'jobs' instead of 'Job' for clarity
  companyJobs: Job[]
  loadJobs: () => Promise<void>
  loadJobsByCompanyId: (ownerId: string) => Promise<void>
}

export const useJobStore = create<JobStore>((set) => ({
  jobs: [],
  companyJobs: [],
  loadJobs: async () => {
    const res = await JobService.getJobs()
    set(() => ({ jobs: res }))
  },
  loadJobsByCompanyId: async (ownerId: string) => {
    const res = await JobService.getJobsByCompanyId(ownerId)
    set(() => ({ companyJobs: Array.isArray(res?.jobs) ? res.jobs : [] }))
  }
}))
