import { Company } from "@/models";
import { CompanyService } from "@/services";
import { create } from "zustand";

type CompanyStore = {
    Company: Company;
    loadCompany: (slug: string) => void;
};

export const useCompanyStore = create<CompanyStore>()((set) => ({
    Company: {
        id: "0", 
        accountId: 0, 
        name: '',
        avatar: '',
        slug: '', 
        employeeCount: 0, 
        description: '',
        address: '' 
    },
    loadCompany: async (slug: string) => {
        const res = await CompanyService.getCompany(slug);
        set(() => ({ Company: res?.Company })); // Cập nhật trạng thái Company với dữ liệu nhận được
    }
}));
