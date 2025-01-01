import { ApiResult, ListResult, Metadata, ValueTranslations, type Job } from '@/models'
import { http } from '../http'
import { Pagination } from '@/models'

const getJobsByCompany = async (
  companyId: string,
  keyword: string | null,
  pagination: Pagination,
  provinceId: number | null
): Promise<ApiResult<ListResult<Job[]>> | undefined> => {
  try {
    let baseUrl = `/Company/GetCompanyJobs/${companyId}/jobs?Pagination.Page=${pagination.page}&Pagination.PageSize=${pagination.pageSize}`

    if (keyword) {
      baseUrl += `&Filter.Keyword=${keyword}`
    }

    if (provinceId) {
      baseUrl += `&Filter.ProvinceId=${provinceId}`
    }

    const res = await http().get<ApiResult<ListResult<Job[]>>>(baseUrl)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

const getStatusJobsByCompany = async (
  companyId: string,
  keyword: string | null,
  pagination: Pagination,
  provinceId: number | null,
  status: number | null,
  isNotEnded: boolean | null,
): Promise<ApiResult<ListResult<Job[]>> | undefined> => {
  try {
    let baseUrl = `/Company/GetCompanyJobs/${companyId}/jobs?Pagination.Page=${pagination.page}&Pagination.PageSize=${pagination.pageSize}`

    if (keyword) {
      baseUrl += `&Filter.Keyword=${keyword}`
    }

    if (provinceId) {
      baseUrl += `&Filter.ProvinceId=${provinceId}`
    }

    if(status !== null){
      baseUrl += `&Filter.Status=${status}`
    }

    if(isNotEnded){
      baseUrl += `&Filter.IsNotEnded=${isNotEnded}`
    }

    const res = await http().get<ApiResult<ListResult<Job[]>>>(baseUrl)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

const getJobById = async (jobId: string): Promise<ApiResult<Job> | undefined> => {
  try {
    const baseUrl = `Job/GetJob?id=${jobId}`
    const res = await http().get<ApiResult<Job>>(baseUrl)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

const getJobs = async (param: string) => {
  const url = `/Job/GetJobsByPagination?${param}`
  try {
    const res = await http().get<ApiResult<ListResult<Job[]>>>(url)
    return res.data.result
  } catch (error) {
    console.log(error)
  }
}

const createJob = async (jobData: Job): Promise<ApiResult<{ id: string }> | undefined> => {
  try {
    const url = '/Job/CreateJob'
    const res = await http().post<ApiResult<{ id: string }>>(url, jobData)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const JobService = { getJobById, getJobsByCompany, getJobs, createJob, getStatusJobsByCompany }
