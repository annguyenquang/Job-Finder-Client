import { Job, JobApplication, JobApplicationParam, Pagination } from '@/models'
import { JobApplicationService, JobService } from '@/services'
import { create } from 'zustand'

type JobDetailStore = {
  job: Job
  jobs: Job[]
  totalJobs: number
  jobApplications: JobApplication[]
  jobApplicationParam: JobApplicationParam
  jobApplicationLoading: boolean
  total: number

  keyword: string
  provinceId: number
  loadJobs: (companyId: string, pagination: Pagination) => Promise<void>
  loadJobById: (jobId: string) => Promise<void>
  loadApplication: (param: JobApplicationParam) => Promise<void>
  setSearchKeyword: (keyword: string) => void
  setProvinceId: (provinceId: number) => void
  updateJobApplicationParam: (newParam: JobApplicationParam) => void
}

export const emptyJob: Job = {
  id: '',
  title: '',
  description: '',
  salary: 0,
  status: 0,
  closeDate: new Date(),
  provinceId: 0,
  districtId: 0,
  minAgeRequirement: 0,
  maxAgeRequirement: 0,
  genderRequirement: {
    type: 0,
    value: '',
    id: ''
  },
  educationLevelRequirement: {
    type: 0,
    value: '',
    id: ''
  },
  workExperienceRequirement: {
    type: 0,
    value: '',
    id: ''
  },
  workArrangement: {
    type: 0,
    value: '',
    id: ''
  },
  commitmentType: {
    type: 0,
    value: '',
    id: ''
  },
  company: {
    name: '',
    emailContact: '',
    phoneContact: '',
    description: '',
    employeeCount: 0,
    provinceId: 0,
    districtId: 0,
    logo: '',
    slug: '',
    address: '',
    website: '',
    industry: '',
    id: ''
  },
  skills: [],
  createdAt: new Date(),
  updatedAt: new Date(),
  createdBy: null,
  updatedBy: null
}

export const useJobDetailStore = create<JobDetailStore>((set, get) => ({
  job: emptyJob,
  jobs: [emptyJob],
  totalJobs: 0,
  jobApplications: [],
  total: 0,
  jobApplicationParam: new JobApplicationParam(),
  jobApplicationLoading: false,
  keyword: '',
  provinceId: 0,

  loadJobs: async (companyId: string, pagination: Pagination) => {
    const { keyword, provinceId } = get()
    const res = await JobService.getJobsByCompany(companyId, keyword, pagination, provinceId)
    if (res) {
      set({
        jobs: res.result.data,
        totalJobs: res.result.total
      })
    }
  },

  loadJobById: async (jobId: string) => {
    const { loadApplication, updateJobApplicationParam } = useJobDetailStore.getState()

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
    const { jobApplicationParam } = useJobDetailStore.getState()

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
