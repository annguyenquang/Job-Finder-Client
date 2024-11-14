import { Job, Company, JobStatus } from "@/models"; 
import { create } from "zustand";
import { emptyCompany } from "../CompanyStore";
import { JobService } from "@/services";

type CreateJobStore = {
    jobData: Job;
    succeeded: boolean | null,
    setsucceeded: (succeeded: boolean | null) => void;
    setJobId: (id: string) => void;
    setJobTitle: (title: string) => void;
    setJobDescription: (description: string) => void;
    setSalary: (salary: number | null) => void;
    setProvinceId: (provinceId: number) => void;
    setDistrictId: (districtId: number) => void;
    setMinAgeRequirement: (minAge: number | null) => void;
    setMaxAgeRequirement: (maxAge: number | null) => void;
    setGenderRequirementId: (id: string) => void;
    setEducationLevelRequirementId: (id: string) => void;
    setWorkExperienceRequirementId: (id: string) => void;
    setWorkArrangementId: (id: string) => void;
    setCommitmentTypeId: (id: string) => void;
    setSkills: (skills: string[]) => void; 
    setCreatedAt: (date: Date) => void;
    setUpdatedAt: (date: Date) => void;
    setCloseDate: (date: Date) => void; 
    setCompany: (company: Company) => void;
    resetJobForm: () => void;
    submitJob: () => Promise<void>;
};

const initialJobData: Job = {
    id: "",
    title: "",
    description: "",
    salary: 0,
    status: JobStatus.Open,
    closeDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    provinceId: 0,
    districtId: 0,
    minAgeRequirement: null,
    maxAgeRequirement: null,
    genderRequirement: { type: 4, value: "", id: "" },
    educationLevelRequirement: { type: 3, value: "", id: "" },
    workExperienceRequirement: { type: 2, value: "", id: "" },
    workArrangement: { type: 1, value: "", id: "" },
    commitmentType: { type: 0, value: "", id: "" },
    company: emptyCompany,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "account1",
    updatedBy: null,
    skills: [],
};

export const useCreateJobStore = create<CreateJobStore>((set, get) => ({
    jobData: initialJobData,
    succeeded:null,
    setsucceeded: (succeeded) => set({ succeeded }),
    setJobId: (id) => set((state) => ({ jobData: { ...state.jobData, id } })), 
    setJobTitle: (title) => set((state) => ({ jobData: { ...state.jobData, title } })),
    setJobDescription: (description) => set((state) => ({ jobData: { ...state.jobData, description } })),
    setSalary: (salary) => set((state) => ({ jobData: { ...state.jobData, salary } })),
    setProvinceId: (provinceId) => set((state) => ({ jobData: { ...state.jobData, provinceId } })),
    setDistrictId: (districtId) => set((state) => ({ jobData: { ...state.jobData, districtId } })),
    setMinAgeRequirement: (minAge) => set((state) => ({ jobData: { ...state.jobData, minAgeRequirement: minAge } })),
    setMaxAgeRequirement: (maxAge) => set((state) => ({ jobData: { ...state.jobData, maxAgeRequirement: maxAge } })),
    
    setGenderRequirementId: (id) => set((state) => ({
        jobData: { ...state.jobData, genderRequirement: { ...state.jobData.genderRequirement, id } }
    })),
    setEducationLevelRequirementId: (id) => set((state) => ({
        jobData: { ...state.jobData, educationLevelRequirement: { ...state.jobData.educationLevelRequirement, id } }
    })),
    setWorkExperienceRequirementId: (id) => set((state) => ({
        jobData: { ...state.jobData, workExperienceRequirement: { ...state.jobData.workExperienceRequirement, id } }
    })),
    setWorkArrangementId: (id) => set((state) => ({
        jobData: { ...state.jobData, workArrangement: { ...state.jobData.workArrangement, id } }
    })),
    setCommitmentTypeId: (id) => set((state) => ({
        jobData: { ...state.jobData, commitmentType: { ...state.jobData.commitmentType, id } }
    })),
    
    setCreatedAt: (date) => set((state) => ({ jobData: { ...state.jobData, createdAt: date } })),
    setUpdatedAt: (date) => set((state) => ({ jobData: { ...state.jobData, updatedAt: date } })),

    setSkills: (skills) => set((state) => ({ jobData: { ...state.jobData, skills } })),
    setCloseDate: (date) => set((state) => ({ jobData: { ...state.jobData, closeDate: date } })), 

    setCompany: (company) => set((state) => ({ jobData: { ...state.jobData, company } })), 

    resetJobForm: () => set({ jobData: initialJobData, succeeded: null }),

    submitJob: async () => {
        const { jobData, setJobId, setsucceeded } = get();

        const data = {
            title: jobData.title,
            description: jobData.description,
            salary: jobData.salary,
            status: jobData.status,
            closeDate: jobData.closeDate,
            provinceId: jobData.provinceId,
            districtId: jobData.districtId,
            minAgeRequirement: jobData.minAgeRequirement,
            maxAgeRequirement: jobData.maxAgeRequirement,
            workArrangementId: jobData.workArrangement.id,
            commitmentTypeId: jobData.commitmentType.id,
            genderRequirementId: jobData.genderRequirement.id,
            educationLevelRequirementId: jobData.educationLevelRequirement.id,
            workExperienceRequirementId: jobData.workExperienceRequirement.id,
            skills: jobData.skills,
            companyId:  jobData.company.id,
        }

        const isValidData = data.title && data.description &&
        data.provinceId && data.districtId && data.closeDate &&
        data.workArrangementId && data.commitmentTypeId &&
        data.genderRequirementId && data.educationLevelRequirementId &&
        data.workExperienceRequirementId && data.companyId;

        if (!isValidData) {
        console.error("Required fields are missing or invalid in job data:", data);
        setsucceeded(false);
        return;
        }

        try {
            const res = await JobService.createJob(data as any);
            if(res?.succeeded){
                const jobId = res?.result.id;
                setJobId(jobId);
                setsucceeded(true);
            }else{
                setsucceeded(false)
            }
        } catch (error) {
            console.error("Failed to create job:", error);
        }
    },
}));
