import { ApiResult, ListResult, type Job } from "@/models";
import { http } from "../http";
import { Pagination } from "@/models";

const getJobsByCompany = async (
    companyId: string, 
    keyword: string | null, 
    pagination: Pagination, 
    provinceId: number | null
): Promise<ApiResult<ListResult<Job[]>> | undefined> => {
    try {
        let baseUrl = `/Company/GetCompanyJobs/${companyId}/jobs?Pagination.Page=${pagination.page}&Pagination.PageSize=${pagination.pageSize}`;
        
        if (keyword) {
            baseUrl += `&Filter.Keyword=${keyword}`;
        }
        
        if (provinceId) {
            baseUrl += `&Filter.ProvinceId=${provinceId}`;
        }
        
        const res = await http().get<ApiResult<ListResult<Job[]>>>(baseUrl);
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