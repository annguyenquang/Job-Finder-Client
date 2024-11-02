import { type Job } from "@/models";
import { http } from "../http";

export type JobPaginationByCompany = {
    page: number,
    pageSize: number
}

type JobResponse = {
    succeeded: boolean,
    result: {
        pagination: {
            page: number,
            pageSize: number
        },
        data: Job[],
        total: number // Thêm trường này
    },
    errors: string[]
};

const getJobsByCompany = async (companyId: string, keyword: string | null, pagination: JobPaginationByCompany): Promise<JobResponse | undefined> => {
    try {
        const baseUrl = `/Company/GetCompanyJobs/${companyId}/jobs?Pagination.Page=${pagination.page}&Pagination.PageSize=${pagination.pageSize}`;
        const url = keyword ? `${baseUrl}&Filter.Keyword=${keyword}` : baseUrl; // Tối ưu hóa việc xây dựng URL
        const res = await http().get<JobResponse>(url);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const JobService = { getJobsByCompany };