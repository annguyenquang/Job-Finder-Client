import { Company } from '@/models'
import { CompanyService } from '@/services'
import { create } from 'zustand'
import { emptyCompany } from '../CompanyStore'

type EditCompanyStore = {
  company: Company
  setName: (name: string) => void;
  setSlug: (slug: string) => void;
  setEmail: (emailContact: string) => void;
  setPhone: (phoneContact: string) => void;
  setAddress: (address: string) => void;
  setDescription: (description: string) => void;
  setWebsite: (website: string) => void;
  setEmployeeCount: (employeeCount: number) => void;
  setProvinceId: (provinceId: number) => void;
  setDistrictId: (districtId: number) => void;
  loadCompany: (slug: string) => Promise<void>
  editCompany: () => Promise<boolean>;

}

export const useEditCompanyStore = create<EditCompanyStore>()((set, get) => ({
  company: emptyCompany, 
  setName: (name) => set((state) => ({ company: { ...state.company, name } })),
  setSlug: (slug) => set((state) => ({ company: { ...state.company, slug } })),
  setEmail: (emailContact) => set((state) => ({ company: { ...state.company, emailContact } })),
  setPhone: (phoneContact) => set((state) => ({ company: { ...state.company, phoneContact } })),
  setAddress: (address) => set((state) => ({ company: { ...state.company, address } })),
  setWebsite: (website) => set((state) => ({ company: { ...state.company, website } })),
  setEmployeeCount: (employeeCount) => set((state) => ({ company: { ...state.company, employeeCount } })),
  setDescription: (description) => set((state) => ({ company: { ...state.company, description } })),
  setProvinceId: (provinceId) => set((state) => ({ company: { ...state.company, provinceId } })),
  setDistrictId: (districtId) => set((state) => ({ company: { ...state.company, districtId } })),
  loadCompany: async (slug: string) => {
    const res = await CompanyService.GetCompanyBySlug(slug)
    set(() => ({ company: res?.result })) 
  },
  editCompany: async () => {
    const { company } = get();

    const data = {
      id: company.id,
      name: company.name,
      emailContact: company.emailContact,
      phoneContact: company.phoneContact,
      address: company.address,
      website: company.website,
      slug: company.slug,
      description: company.description,
      logoFile: null,
      employeeCount: company.employeeCount,
      provinceId: company.provinceId,
      districtId: company.districtId,
    };

    const isValidData = data.name && data.emailContact &&
      data.phoneContact && data.address && data.website &&
      data.slug && data.description &&
      data.employeeCount && data.provinceId &&
      data.districtId;

    if (!isValidData) {
      console.error("Required fields are missing or invalid in job data:", data);
      return false;
    }

    try {
      const res = await CompanyService.editCompany(data as any);
      return !!res?.result; 
    } catch (error) {
      console.error("Failed to edit company:", error);
      return false; 
    }
  },
}))
