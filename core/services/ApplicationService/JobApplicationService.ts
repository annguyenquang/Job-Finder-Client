import { ApiResult, GetUserJobApplicationsParams, ListResult, UserJobApplication, JobApplication } from '@/models'
import { http } from '@/services'

type JobApplictionParams = {
  userId: string
  jobId: string
  CVFile: File | null
  coverLetter: string | null
  phoneNumber: string | null
}
type CreateJobApplicationBody = JobApplictionParams

const CreateJobApplication = async (jobApplication: JobApplictionParams): Promise<string | undefined> => {
  try {
    const url = `/JobApplication/CreateJobApplication`
    const body: CreateJobApplicationBody = {
      userId: jobApplication.userId,
      jobId: jobApplication.jobId,
      CVFile: jobApplication.CVFile,
      coverLetter: jobApplication.coverLetter,
      phoneNumber: jobApplication.phoneNumber
    }
    const res = await http().post<ApiResult<string>>(url, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return res.data.result
  } catch (error) {
    console.log(error)
  }
}

const getApplication = async (param: string): Promise<ApiResult<ListResult<JobApplication[]>> | undefined> => {
  const url = `/JobApplication/GetAllJobApplication?${param}`
  try {
    const res = await http().get<ApiResult<ListResult<JobApplication[]>>>(url)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

const updateApplication = async (applicationId: string, state: number): Promise<ApiResult<string> | undefined> => {
  const url = `http://localhost:5127/api/JobApplication/UpdateJobApplicationState`
  const data = {
    jobApplicationId: applicationId,
    state: state
  }
  try {
    const res = await http().patch<ApiResult<string>>(url, data)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

const GetUserJobApplications = async (params: GetUserJobApplicationsParams) => {
  try {
    const url = `JobApplication/GetJobApplicationByUserId?userId=${params.userId}&pagination.page=${params.page}&pagination.pageSize=${params.pageSize}`
    const res = await http().get<ApiResult<ListResult<UserJobApplication[]>>>(url)
    return res.data.result
  } catch (error) {
    console.log(error)
  }
}

export const JobApplicationService = { CreateJobApplication, getApplication, GetUserJobApplications, updateApplication }
