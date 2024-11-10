import { Job } from '@/models'
import { JobParam } from '@/models/common/JobFilterParam'
import { Metadata } from '@/models/common/Metadata'
import { Pagination } from '@/models/common/Pagination'
import { JobService } from '@/services'
import { create } from 'zustand'

type JobStore = {
  jobs: Job[] // Rename to 'jobs' instead of 'Job' for clarity
  companyJobs: Job[]
  filter: Metadata[]
  total: number
  reqParam: JobParam
  loadJobs: () => Promise<void>
  loadFilter: () => Promise<void>
  modifyFilter: (id: string) => void
  loadJobsByCompanyId: (ownerId: string) => Promise<void>
  updateParam: (newParam: JobParam) => void // Update param state
}

const DEFAULT_PAGE = 1
const DEFAULT_PAGESIZE = 6

export const useJobStore = create<JobStore>((set) => ({
  jobs: [],
  companyJobs: [],
  reqParam: new JobParam(),
  filter: [],
  total: 0,

  loadFilter: async () => {
    const initialFilter = await JobService.getAndParseMetadata()
    console.log('initialFilter: ' + initialFilter)
    set(() => ({
      filter: initialFilter
    }))
  },
  modifyFilter: (id: string) => {
    set((state) => ({
      filter: state.filter.map((item) => {
        // Check if the item has the same type as the selected item
        if (item.id === id) {
          // Set active to 1 for the selected item
          return { ...item, active: 1 }
        } else if (item.type === state.filter.find((f) => f.id === id)?.type) {
          // Set active to 0 for other items with the same type
          return { ...item, active: 0 }
        }
        // Return the item unchanged if it's neither selected nor of the same type
        return item
      })
    }))
  },
  loadJobs: async () => {
    const { reqParam } = useJobStore.getState()
    const res = await JobService.getJobs(reqParam.constructParam())
    set((state) => ({
      jobs: res.data || [], // Update the state with the jobs array
      total: Math.ceil(res.total / state.reqParam.pagination.pageSize)
    }))
  },
  loadJobsByCompanyId: async (ownerId: string) => {
    const res = await JobService.getJobsByCompanyId(ownerId)
    set(() => ({ companyJobs: Array.isArray(res?.jobs) ? res.jobs : [] }))
  },
  updateParam: (newParam: JobParam) => {
    set({ reqParam: newParam })
  }
}))
