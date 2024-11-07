import { ApiResult, type Job } from "@/models";
import { http } from "../http";

export type JobPaginationByCompany = {
    page: number,
    pageSize: number
}

type jobResult<T> = {
    pagination: JobPaginationByCompany,
    data: T,
    total: number
}

const getJobsByCompany = async (companyId: string, keyword: string | null, pagination: JobPaginationByCompany): Promise<ApiResult<jobResult<Job[]>> | undefined> => {
    try {
        const baseUrl = `/Company/GetCompanyJobs/${companyId}/jobs?Pagination.Page=${pagination.page}&Pagination.PageSize=${pagination.pageSize}`;
        const url = keyword ? `${baseUrl}&Filter.Keyword=${keyword}` : baseUrl; // Tối ưu hóa việc xây dựng URL
        const res = await http().get<ApiResult<jobResult<Job[]>>>(url);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

// export const JobService = { getJobsByCompany };import { ApiResult, Job } from "@/models";
// import { http } from "../http";

// export type JobPaginationByCompany = {
//     page: number,
//     pageSize: number
// }

const getJobById = async (jobId: string): Promise<ApiResult<Job> | undefined> => {
    try {
        const baseUrl = `Job/GetJob?id=${jobId}`;
        const res = await http().get<ApiResult<Job>>(baseUrl);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const JobService = { getJobById, getJobsByCompany };