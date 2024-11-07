import type { ApiResult, Company } from "@/models";
import { http } from "../http";

const GetCompanyBySlug = async (slug: string) => {
    try {
        const url = `/Company/GetCompanyBySlug/${slug}`;
        const res = await http().get<ApiResult<Company>>(url);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const CompanyService = { GetCompanyBySlug };