import { Job } from "@/models";
import { JobService, JobPaginationByCompany } from "@/services";
import { create } from "zustand";

type JobStore = {
    job: Job// chỉ có 1 job trong mảng;
    jobs: Job[];
    totalJobs: number;
    searchKeyword: string;
    // loadJobs: (companyId: string, pagination: JobPaginationByCompany) => Promise<void>;
    loadJobById: (jobId: string) => Promise<void>;
};

const emptyJob: Job = {
    id: "",
    title: "",
    description: "",
    salary: 0,
    status: 0, 
    closeDate: new Date, 
    provinceId: 0,
    districtId: 0,
    minAgeRequirement: 0,
    maxAgeRequirement: 0,
    genderRequirement: {
        type: 0,
        value: "",
        id: ""
    },
    educationLevelRequirement: {
        type: 0,
        value: "",
        id: ""
    },
    workExperienceRequirement: {
        type: 0,
        value: "",
        id: ""
    },
    workArrangement: {
        type: 0,
        value: "",
        id: ""
    },
    commitmentType: {
        type: 0,
        value: "",
        id: ""
    },
    company: {
        name: "",
        emailContact: "",
        phoneContact: "",
        description: "",
        employeeCount: 0,
        provinceId: 0,
        districtId: 0,
        logo: "",
        slug: "",
        address: "",
        website: "",
        industry: "",
        id: ""
    },
    createdAt: new Date,
    updatedAt: new Date,
    createdBy: null,
    updatedBy: null,
};

export const useJobStore = create<JobStore>((set, get) => ({
    job: emptyJob,
    jobs: [emptyJob],
    totalJobs: 0,
    searchKeyword: "",
    // loadJobs: async (companyId: string, pagination: JobPaginationByCompany) => {
    //     const res = await JobService.getJobsByCompany(companyId, get().searchKeyword, pagination);
    //     if (res) {
    //         set(() => ({
    //             jobs: res.result.data, // Lưu trữ danh sách công việc
    //             totalJobs: res.result.total // Cập nhật tổng số công việc
    //         }));
    //     }
    // },
    loadJobById: async(jobId: string) => {
        const res = await JobService.getJobById(jobId);
        if (res) { // Kiểm tra xem phản hồi có thành công không
            set(() => ({
                job: res.result, // Cập nhật job với dữ liệu từ phản hồi
            }));
        }
    }
}));