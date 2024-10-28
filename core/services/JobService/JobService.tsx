import { JobStatus, type CompanyDetail, type Job } from '@/models'
import { http } from '../http'
import { Pagination } from '@/models/common/Pagination'
import { Metadata } from '@/models/common/Metadata'
type JobResponse = {
  jobs: Job[] // Chỉnh sửa để trả về mảng các Job
}

export type GetJobParam = {
  pagination: Pagination
}

const getQuery = (param: GetJobParam) => {
  const pagination = `Pagination.Page=${param.pagination.page}&Pagination.PageSize=${param.pagination.pageSize}`
  return pagination
}

const getJobs = async (param: GetJobParam) => {
  const url = `/Position/GetPositionsByPagination?${getQuery(param)}`
  try {
    const res = await http().get(url)
    return res.data.result
  } catch (error) {
    console.log(error)
  }
}

const getAndParseMetadata = async (): Promise<Metadata[] | undefined> => {
  const url = `/Metadata/GetMetadataByPagination`
  try {
    const res = await http().get(url)
    const rawMetadata: Metadata[] = res.data.result
    const parsedMetadata: Metadata[] = rawMetadata.map((e) => {
      const parsedValue = JSON.parse(e.value) // Parse the JSON string
      const translatedValue = ValueTranslations[parsedValue.data] || parsedValue.data // Get the translated value
      return { ...e, value: translatedValue, active: e.active !== undefined ? e.active : 0 }
    })
    return parsedMetadata
  } catch (e) {
    console.log(e)
  }
}

const getJobsByCompanyId = async (ownerId: string): Promise<JobResponse | undefined> => {
  return
}

export const JobService = { getJobsByCompanyId, getJobs, getAndParseMetadata }
