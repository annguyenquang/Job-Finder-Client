export type Company = {
    id: string; // Mã công ty
    accountId: string; // ID tài khoản
    name: string; // Tên công ty
    emailContact: string; // Email liên hệ 
    phoneContact: string; // Số điện thoại liên hệ 
    employeeCount: number; // Số lượng nhân viên
    slug: string; // Tên mã hóa
    address: string; // Địa chỉ công ty
    website: string; // Website 
    industry: string; // Ngành nghề 
    createdAt?: Date; // Ngày tạo
    updatedAt?: Date; // Ngày cập nhật
    createdBy?: string; // Người tạo
    updatedBy?: string; // Người cập nhật
    districtId: number; // ID quận 
    provinceId: number; // ID tỉnh 
    description: string; // Mô tả 
    logo: string; // Logo 
}