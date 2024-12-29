import type { ApiResult, Company, ListResult } from '@/models'
import { http } from '../http'

const getCompanyBySlug = async (slug: string) => {
  try {
    const url = `/Company/GetCompanyBySlug/${slug}`
    const res = await http().get<ApiResult<Company>>(url)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

const getCompanies = async (param: string) => {
  const url = `/Company/GetCompanysByPagination?${param}`
  try {
    const res = await http().get<ApiResult<ListResult<Company[]>>>(url)
    return res.data.result
  } catch (error) {
    console.log(error)
  }
}

const editCompany = async (company: Company): Promise<ApiResult<{ id: string }> | undefined> => {
  try {
    const url = `/Company/UpdateCompany/${company.id}`

    const res = await http().patch<ApiResult<{ id: string }>>(url, company, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return res.data
  } catch (error) {
    console.log(error)
  }
}

const createCompany = async (company: Company): Promise<ApiResult<{ id: string }> | undefined> => {
  try {
    const url = '/Company/CreateCompany'
    const res = await http().post<ApiResult<{ id: string }>>(url, company, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const CompanyService = { GetCompanyBySlug: getCompanyBySlug, getCompanies, editCompany }
