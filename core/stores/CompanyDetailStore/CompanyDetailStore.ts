import { CompanyDetail } from "@/models";
import { CompanyDetailService } from "@/services";
import { create } from "zustand";

type CompanyDetailStore = {
    CompanyDetail: CompanyDetail;
    loadCompanyDetail: (slug: string) => void;
};

export const useCompanyDetailStore = create<CompanyDetailStore>()((set) => ({
    CompanyDetail: {
        id: "0", 
        accountId: 0, 
        name: '',
        avatar: '',
        slug: '', 
        employeeCount: 0, 
        description: '',
        address: '' 
    },
    loadCompanyDetail: async (slug: string) => {
        const res = await CompanyDetailService.getCompanyDetail(slug);
        set(() => ({ CompanyDetail: res?.companyDetail })); // Cập nhật trạng thái CompanyDetail với dữ liệu nhận được
    }
}));
