import { ApiResult, Job } from "@/models";
import { http } from "../http";


const getJobById = async (jobId: string): Promise<ApiResult<Job> | undefined> => {
    try {
        const baseUrl = `Job/GetJob?id=${jobId}`;
        const res = await http().get<ApiResult<Job>>(baseUrl);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const JobService = { getJobById };