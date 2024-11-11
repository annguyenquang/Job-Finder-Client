import { Company } from '@/models'
import { CompanyService } from '@/services'
import { create } from 'zustand'
import { Job } from '../../models/JobModel/Job'

type CompanyStore = {
  company: Company
  loadCompany: (slug: string) => void
}

// Đối tượng company rỗng
const emptyCompany: Company = {
  id: '', // Mã công ty
  accountId: '', // ID tài khoản
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

  loadCompany: async (slug: string) => {
    const res = await CompanyService.GetCompanyBySlug(slug)
    set(() => ({ company: res?.result })) // Cập nhật trạng thái company với dữ liệu nhận được
  }
}))
