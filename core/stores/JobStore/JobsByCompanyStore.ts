import { Job, JobApplication, JobApplicationParam, Pagination } from '@/models'
import { JobApplicationService, JobService } from '@/services'
import { create } from 'zustand'
import { emptyJob } from './JobDetailStore'

type JobsByCompanyStore = {
  job: Job
  allJobs: Job[]
  openJobs: Job[]
  closedJobs: Job[]
  totalAllJobs: number
  totalOpenJobs: number
  totalClosedJobs: number
  jobApplications: JobApplication[]
  jobApplicationParam: JobApplicationParam
  jobApplicationLoading: boolean
  total: number

  keyword: string
  provinceId: number
  loadAllJobs: (companyId: string, pagination: Pagination) => Promise<void>
  loadOpenJobs: (companyId: string, pagination: Pagination) => Promise<void>
  loadClosedJobs: (companyId: string, pagination: Pagination) => Promise<void>
  loadJobById: (jobId: string) => Promise<void>
  loadApplication: (param: JobApplicationParam) => Promise<void>
  setSearchKeyword: (keyword: string) => void
  setProvinceId: (provinceId: number) => void
  updateJobApplicationParam: (newParam: JobApplicationParam) => void
}

export const useJobsByCompanyStore = create<JobsByCompanyStore>((set, get) => ({
  job: emptyJob,
  allJobs: [],
  openJobs: [],
  closedJobs: [],
  totalAllJobs: 0,
  totalOpenJobs: 0,
  totalClosedJobs: 0,
  jobApplications: [],
  total: 0,
  jobApplicationParam: new JobApplicationParam(),
  jobApplicationLoading: false,
  keyword: '',
  provinceId: 0,

  loadAllJobs: async (companyId: string, pagination: Pagination) => {
    const { keyword, provinceId } = get()
    const res = await JobService.getJobsByCompany(companyId, keyword, pagination, provinceId)
    if (res) {
      set({
        allJobs: res.result.data,
        totalAllJobs: res.result.total
      })
    }
  },

  loadOpenJobs: async (companyId: string, pagination: Pagination) => {
    const { keyword, provinceId } = get()
    const res = await JobService.getStatusJobsByCompany(companyId, keyword, pagination, provinceId, 1, true)
    if (res) {
      set({
        openJobs: res.result.data,
        totalOpenJobs: res.result.total
      })
    }
  },

  loadClosedJobs: async (companyId: string, pagination: Pagination) => {
    const { keyword, provinceId } = get()
    const res = await JobService.getStatusJobsByCompany(companyId, keyword, pagination, provinceId, 0, null)
    if (res) {
      set({
        closedJobs: res.result.data,
        totalClosedJobs: res.result.total
      })
    }
  },

  loadJobById: async (jobId: string) => {
    const { loadApplication, updateJobApplicationParam } = useJobsByCompanyStore.getState()

    // Clone jobApplicationParam
    const newJobApplicationParam = new JobApplicationParam()
    Object.assign(newJobApplicationParam, get().jobApplicationParam)
    newJobApplicationParam.setJobId(jobId)

    updateJobApplicationParam(newJobApplicationParam)

    const res = await JobService.getJobById(jobId)
    if (res) {
      set({ job: res.result })
    }
  },

  loadApplication: async (param: JobApplicationParam) => {
    const { jobApplicationParam } = useJobsByCompanyStore.getState()

    // Set loading state to true before the API call
    set({ jobApplicationLoading: true })

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const res = await JobApplicationService.getApplication(param.constructParam())
      if (res) {
        set((state) => ({
          jobApplications: res.result.data,
          total: Math.ceil(res.result.total / state.jobApplicationParam.pagination.pageSize)
        }))
      }
    } catch (error) {
      console.error('Error loading applications:', error)
    } finally {
      // Set loading state to false after the API call
      set({ jobApplicationLoading: false })
    }
  },

  setSearchKeyword: (keyword) => set({ keyword }),

  setProvinceId: (provinceId) => set({ provinceId }),

  updateJobApplicationParam: (newParam: JobApplicationParam) =>
    set({
      jobApplicationParam: newParam
    })
}))
