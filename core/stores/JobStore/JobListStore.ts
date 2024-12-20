import { Job } from '@/models'
import { JobParam } from '@/models/common/JobFilterParam'
import { Metadata } from '@/models/common/Metadata'
import { JobService } from '@/services'
import { MetadataService } from '@/services/MetadataService'
import { create } from 'zustand'

type JobListStore = {
  jobs: Job[] // Rename to 'jobs' instead of 'Job' for clarity
  companyJobs: Job[]
  filter: Metadata[]
  total: number
  reqParam: JobParam
  resetFlag: boolean // Add resetFlag state
  isLoading: boolean
  loadJobs: () => Promise<void>
  loadFilter: () => Promise<void>
  triggerReset: () => void
  modifyFilter: (id: string) => void
  updateParam: (newParam: JobParam) => void // Update param state
}

const DEFAULT_PAGE = 1
const DEFAULT_PAGESIZE = 6

export const useJobListStore = create<JobListStore>((set) => ({
  jobs: [],
  companyJobs: [],
  reqParam: new JobParam(),
  resetFlag: false,
  isLoading: false,
  filter: [],
  total: 0,

  loadFilter: async () => {
    const initialFilter = await MetadataService.getAndParseMetadata()
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
    const { reqParam } = useJobListStore.getState()

    set(() => ({
      isLoading: true
    }))
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const res = await JobService.getJobs(reqParam.constructParam())
      set((state) => ({
        jobs: res?.data || [], // Update the state with the jobs array
        total: Math.ceil(res ? res.total / state.reqParam.pagination.pageSize : 0)
      }))
    } catch (error) {
      console.log('Cannot load job due to error: ' + error)
    } finally {
      set(() => ({
        isLoading: false
      }))
    }
  },

  updateParam: (newParam: JobParam) => {
    set({ reqParam: newParam })
  },

  triggerReset: () => {
    set((state) => ({
      resetFlag: !state.resetFlag
    }))
  }
}))
