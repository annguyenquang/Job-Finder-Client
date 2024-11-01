import { JobStatus } from "./JobStatus"
export type Job = {
    id: string; // Mã công việc
    title: string; // Tiêu đề công việc
    description: string; // Mô tả công việc
    salary: number; // Mức lương
    status: JobStatus; // Trạng thái công việc
    closeDate: Date; // Ngày đóng
    provinceId: number; // ID tỉnh 
    districtId: number; // ID quận 
    minAgeRequirement: number; // Yêu cầu độ tuổi tối thiểu 
    maxAgeRequirement: number; // Yêu cầu độ tuổi tối đa 
    workArrangementId: string; // ID hình thức làm việc 
    commitmentTypeId: string; // ID loại cam kết 
    genderRequirementId: string; // ID yêu cầu giới tính 
    educationLevelRequirementId: string; // ID yêu cầu trình độ học vấn 
    workExperienceRequirementId: string; // ID yêu cầu kinh nghiệm làm việc 
    companyId: string; // ID công ty
    createdAt: Date; // Ngày tạo
    updatedAt: Date; // Ngày cập nhật
    createdBy: string; // Người tạo
    updatedBy: string; // Người cập nhật
}