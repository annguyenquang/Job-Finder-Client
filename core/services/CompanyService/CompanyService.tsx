import type { Company } from "@/models";
import { http } from "../http";

type CompanyResponse = {
    succeeded: boolean,
    result: Company,
    errors: string[] // Danh sách lỗi
}

const GetCompanyBySlug = async (slug: string) => {
    try {
        const url = `/Company/GetCompanyBySlug/${slug}`;
        const res = await http().get<CompanyResponse>(url);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};


export const CompanyService = { GetCompanyBySlug };