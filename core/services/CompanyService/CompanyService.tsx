import type { ApiResult, Company, CompanyAccount, ListResult } from '@/models'
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

type CreateCompanyBody = {
  username: string
  password: string
  phone: string
  email: string
  name: string
  emailContact: string
  phoneContact: string
  description: string
  employeeCount: number
  address: string
  slug: string
  logoFile: File | null
  provinceId: string
  districtId: string
  website: string
  industry: string
}

type CreateCompanyParam = {
  username: string
  password: string
  phone: string
  email: string
  name: string
  emailContact: string
  phoneContact: string
  description: string
  employeeCount: number
  address: string
  logoFile: File | null
  provinceId: string
  districtId: string
  website: string
  industry: string
  slug: string
}

const createCompany = async (params: CreateCompanyParam): Promise<ApiResult<{ id: string }> | undefined> => {
  try {
    const url = '/Company/CreateCompany'
    const body: CreateCompanyBody = {
      username: params.username,
      password: params.password,
      phone: params.phone,
      email: params.email,
      name: params.name,
      emailContact: params.emailContact,
      phoneContact: params.phoneContact,
      description: params.description,
      employeeCount: params.employeeCount,
      address: params.address,
      logoFile: params.logoFile,
      provinceId: params.provinceId,
      districtId: params.districtId,
      website: params.website,
      industry: params.industry,
      slug: params.slug
    }
    const res = await http().post<ApiResult<{ id: string }>>(url, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const CompanyService = { GetCompanyBySlug: getCompanyBySlug, getCompanies, editCompany, createCompany }
