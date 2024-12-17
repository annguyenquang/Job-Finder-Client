import { Job, JobApplication, JobApplicationParam, Pagination } from '@/models'
import { JobApplicationService, JobService } from '@/services'
import { create } from 'zustand'

type JobDetailStore = {
  job: Job
  jobs: Job[]
  totalJobs: number
  jobApplication: JobApplication[]
  jobApplicationParam: JobApplicationParam
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
  jobApplication: [],
  jobApplicationParam: new JobApplicationParam(),
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

    await loadApplication(newJobApplicationParam)
  },

  loadApplication: async (param: JobApplicationParam) => {
    const { jobApplicationParam } = useJobDetailStore.getState()
    const res = await JobApplicationService.getApplication(param.constructParam())

    if (res) {
      set({
        jobApplication: res
      })
    }
  },

  setSearchKeyword: (keyword) => set({ keyword }),

  setProvinceId: (provinceId) => set({ provinceId }),

  updateJobApplicationParam: (newParam: JobApplicationParam) =>
    set({
      jobApplicationParam: newParam
    })
}))
