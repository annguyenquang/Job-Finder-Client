import { Company } from "@/models";
import { CompanyService } from "@/services";
import { create } from "zustand";

type CompanyStore = {
    Company: Company; // Chú ý sửa từ "Company" thành "company" để nhất quán với kiểu
    loadCompany: (slug: string) => void;
};

// Đối tượng company rỗng
const emptyCompany: Company = {
    id: "", // Mã công ty
    accountId: "", // ID tài khoản
    name: "", // Tên công ty
    emailContact: undefined, // Email liên hệ (nếu có)
    phoneContact: undefined, // Số điện thoại liên hệ (nếu có)
    employeeCount: 0, // Số lượng nhân viên
    slug: "", // Tên mã hóa
    address: "", // Địa chỉ công ty
    website: undefined, // Website (nếu có)
    industry: undefined, // Ngành nghề (nếu có)
    nation: undefined, // Quốc gia (nếu có)
    createdAt: new Date(), // Ngày tạo
    updatedAt: new Date(), // Ngày cập nhật
    createdBy: "", // Người tạo
    updatedBy: "", // Người cập nhật
}

export const useCompanyStore = create<CompanyStore>()((set) => ({
    Company: emptyCompany, // Sử dụng đối tượng company rỗng
    loadCompany: async (slug: string) => {
        const res = await CompanyService.getCompany(slug);
        set(() => ({ Company: res?.data.result })); // Cập nhật trạng thái company với dữ liệu nhận được
    }
}));