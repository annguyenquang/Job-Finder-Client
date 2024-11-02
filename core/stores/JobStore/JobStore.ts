import { Job, JobStatus } from "@/models";
import { JobService, JobPaginationByCompany } from "@/services";
import { create } from "zustand";

type JobStore = {
    jobs: Job[];
    totalJobs: number;
    searchKeyword: string;
    loadJobs: (companyId: string, pagination: JobPaginationByCompany) => Promise<void>;
};

const emptyJob: Job = {
    id: "",
    title: "",
    description: "",
    salary: 0,
    status: JobStatus.Open,
    closeDate: new Date(),
    provinceId: 0,
    districtId: 0,
    minAgeRequirement: 0,
    maxAgeRequirement: 0,
    workArrangementId: "",
    commitmentTypeId: "",
    genderRequirementId: "",
    educationLevelRequirementId: "",
    workExperienceRequirementId: "",
    companyId: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "",
    updatedBy: "",
};

export const useJobStore = create<JobStore>((set, get) => ({
    jobs: [emptyJob],
    totalJobs: 0,
    searchKeyword: "",
    loadJobs: async (companyId: string, pagination: JobPaginationByCompany) => {
        const res = await JobService.getJobsByCompany(companyId, get().searchKeyword, pagination);
        if (res) {
            set(() => ({
                jobs: res.result.data, // Lưu trữ danh sách công việc
                totalJobs: res.result.total // Cập nhật tổng số công việc
            }));
        }
    }
}));