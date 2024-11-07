export type Company = {
    id: string; // Mã công ty
    accountId: string; // ID tài khoản
    name: string; // Tên công ty
    emailContact: string; // Email liên hệ (nếu có)
    phoneContact: string; // Số điện thoại liên hệ (nếu có)
    employeeCount: number; // Số lượng nhân viên
    slug: string; // Tên mã hóa
    address: string; // Địa chỉ công ty
    website: string; // Website (nếu có)
    industry: string; // Ngành nghề (nếu có)
    nation: string; // Quốc gia (nếu có)
    createdAt?: Date; // Ngày tạo
    updatedAt?: Date; // Ngày cập nhật
    createdBy?: string; // Người tạo
    updatedBy?: string; // Người cập nhật
}