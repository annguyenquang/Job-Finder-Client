import { Job } from "@/models";
import { MetadataService } from "@/services/MetadataService";
import { create } from "zustand";

type MetadataStore = {
    commitmentType: string
    educationLevel: string
    workArrangement: string
    genderRequirement: string
    workExperienceRequirement: string
    loadMetadata:(job : Job) => Promise<void>;
};

export const useMetadataStore = create<MetadataStore>((set, get) => ({
    commitmentType: '',
    educationLevel:'',
    workArrangement: '',
    genderRequirement: '',
    workExperienceRequirement: '',
    loadMetadata: async (job: Job) => {
        const metadata = await MetadataService.getAndParseMetadata();
        if (metadata) {
            const { commitmentType, educationLevelRequirement, workArrangement, genderRequirement, workExperienceRequirement } = job;
            set(() => ({
                commitmentType: metadata.find(item => item.id === commitmentType?.id)?.value ?? '',
                educationLevel: metadata.find(item => item.id === educationLevelRequirement?.id)?.value ?? '',
                workArrangement: metadata.find(item => item.id === workArrangement?.id)?.value ?? '',
                genderRequirement: metadata.find(item => item.id === genderRequirement?.id)?.value ?? '',
                workExperienceRequirement: metadata.find(item => item.id === workExperienceRequirement?.id)?.value ?? ''
            }));
        }
    },
}));