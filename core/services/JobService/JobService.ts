import { ApiResult, ListResult, type Job } from "@/models";
import { http } from "../http";
import { Pagination } from "@/models";

const getJobsByCompany = async (companyId: string, keyword: string | null, pagination: Pagination): Promise<ApiResult<ListResult<Job[]>> | undefined> => {
    try {
        const baseUrl = `/Company/GetCompanyJobs/${companyId}/jobs?Pagination.Page=${pagination.page}&Pagination.PageSize=${pagination.pageSize}`;
        const url = keyword ? `${baseUrl}&Filter.Keyword=${keyword}` : baseUrl; 
        const res = await http().get<ApiResult<ListResult<Job[]>>>(url);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

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