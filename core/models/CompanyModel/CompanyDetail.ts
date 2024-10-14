export type CompanyDetail = {
    id: string; // Mã công ty
    accountId: number;
    avatar: string,
    name: string; // Tên công ty
    slug: string; // Tên mã hóa
    employeeCount: number; // Số lượng nhân viên
    description: string; // Giới thiệu công ty
    address: string; // Địa chỉ công ty
    website?: string; // Website (nếu có)
    contactPerson?: string; // Người liên hệ (nếu có)
}