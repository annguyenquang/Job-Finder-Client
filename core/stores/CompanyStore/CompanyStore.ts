import { Company } from '@/models'
import { CompanyParam } from '@/models/common/CompanyParam'
import { CompanyService } from '@/services'
import { create } from 'zustand'

type CompanyStore = {
  company: Company
  companies: Company[]
  reqParam: CompanyParam
  isLoading: boolean
  total: number
  loadCompanies: () => Promise<void>
  loadCompany: (slug: string) => Promise<void>
  updateParam: (newParam: CompanyParam) => void
}

// Đối tượng company rỗng
export const emptyCompany: Company = {
  id: '', // Mã công ty
  name: '', // Tên công ty
  emailContact: '', // Email liên hệ
  phoneContact: '', // Số điện thoại liên hệ
  employeeCount: 0, // Số lượng nhân viên
  slug: '', // Tên mã hóa
  address: '', // Địa chỉ công ty
  website: '', // Website
  industry: '', // Ngành nghề
  createdAt: new Date(), // Ngày tạo
  updatedAt: new Date(), // Ngày cập nhật
  createdBy: '', // Người tạo
  updatedBy: '', // Người cập nhật
  districtId: 0, // ID quận
  provinceId: 0, // ID tỉnh
  description: '', // Mô tả
  logo: '' // Logo
}

export const useCompanyStore = create<CompanyStore>()((set) => ({
  company: emptyCompany, // Sử dụng đối tượng company rỗng
  companies: [],
  isLoading: false,
  total: 0,
  reqParam: new CompanyParam(),
  loadCompany: async (slug: string) => {
    const res = await CompanyService.GetCompanyBySlug(slug)
    set(() => ({ company: res?.result })) // Cập nhật trạng thái company với dữ liệu nhận được
  },
  loadCompanies: async () => {
    const { reqParam } = useCompanyStore.getState()

    set(() => ({
      isLoading: true
    }))
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const res = await CompanyService.getCompanies(reqParam.constructParam())
      set((state) => ({
        companies: res?.data || [], // Update the state with the jobs array
        total: Math.ceil(res ? res.total / state.reqParam.pagination.pageSize : 0)
      }))
    } catch (error) {
      console.log('Cannot load companies due to error: ' + error)
    } finally {
      set(() => ({
        isLoading: false
      }))
    }
  },
  updateParam: (newParam: CompanyParam) => {
    set({ reqParam: newParam })
  }
}))
