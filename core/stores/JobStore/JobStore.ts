import { Job } from '@/models'
import { Metadata } from '@/models/common/Metadata'
import { Pagination } from '@/models/common/Pagination'
import { GetJobParam, JobService } from '@/services'
import { create } from 'zustand'

type JobStore = {
  jobs: Job[] // Rename to 'jobs' instead of 'Job' for clarity
  companyJobs: Job[]
  filter: Metadata[]
  pagination: Pagination
  total: number
  setPage: (page: number) => void
  loadJobs: () => Promise<void>
  loadFilter: () => Promise<void>
  loadJobsByCompanyId: (ownerId: string) => Promise<void>
}

const DEFAULT_PAGE = 1
const DEFAULT_PAGESIZE = 6

export const useJobStore = create<JobStore>((set) => ({
  jobs: [],
  companyJobs: [],
  filter: [],
  pagination: {
    page: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGESIZE
  },
  total: 0,
  setPage: (newPage: number) => {
    set((state) => ({ pagination: { ...state.pagination, page: newPage } }))
  },
  loadFilter: async () => {
    const initialFilter = await JobService.getAndParseMetadata()
    set({
      filter: initialFilter
    })
  },
  loadJobs: async () => {
    const { pagination } = useJobStore.getState() // Get the current pagination state
    const params: GetJobParam = {
      pagination
    }
    const res = await JobService.getJobs(params)
    set((state) => ({
      jobs: res.data || [], // Update the state with the jobs array
      total: Math.ceil(res.total / state.pagination.pageSize)
    }))
  },
  loadJobsByCompanyId: async (ownerId: string) => {
    const res = await JobService.getJobsByCompanyId(ownerId)
    set(() => ({ companyJobs: Array.isArray(res?.jobs) ? res.jobs : [] }))
  }
}))
