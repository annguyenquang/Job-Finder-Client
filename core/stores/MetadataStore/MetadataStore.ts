import { COMMITMENTTYPE, EDUCATIONLEVELTYPE, emptyMetadata, GENDERTYPE, Job, Metadata, WORKARRANGEMENTTYPE, WORKEXPERIENCERETYPE } from "@/models";
import { MetadataService } from "@/services/MetadataService";
import { create } from "zustand";

type MetadataStore = {
    listCommitment: Metadata[]
    listWorkArrangement: Metadata[]
    listGender: Metadata[]
    listEducationLevel: Metadata[]
    listWorkExperience: Metadata[]
    commitmentType: string
    educationLevel: string
    workArrangement: string
    genderRequirement: string
    workExperienceRequirement: string
    loadValueMetadata:(job : Job) => Promise<void>
    loadMetadataByCommitment:() => Promise<void>
    loadMetadataByWorkArrangement:() => Promise<void>
    loadMetadataByGender:() => Promise<void>
    loadMetadataByEducationLevel:() => Promise<void>
    loadMetadataByWorkExperience:() => Promise<void>
};

export const useMetadataStore = create<MetadataStore>((set, get) => ({
    listCommitment: [emptyMetadata],
    listWorkArrangement: [emptyMetadata],
    listGender: [emptyMetadata],
    listEducationLevel: [emptyMetadata],
    listWorkExperience: [emptyMetadata],
    commitmentType: '',
    educationLevel:'',
    workArrangement: '',
    genderRequirement: '',
    workExperienceRequirement: '',
    loadValueMetadata: async (job: Job) => {
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
    loadMetadataByCommitment: async () =>{
        const metadata = await MetadataService.getAndParseMetadata();
        if(metadata){
            set(() => ({
                listCommitment: metadata.filter(item => item.type === COMMITMENTTYPE)
            }));
        }
    },
    loadMetadataByWorkArrangement: async () =>{
        const metadata = await MetadataService.getAndParseMetadata();
        if(metadata){
            set(() => ({
                listWorkArrangement: metadata.filter(item => item.type === WORKARRANGEMENTTYPE)
            }));
        }
    },
    loadMetadataByGender: async () =>{
        const metadata = await MetadataService.getAndParseMetadata();
        if(metadata){
            set(() => ({
                listGender: metadata.filter(item => item.type === GENDERTYPE)
            }));
        }
    },
    loadMetadataByEducationLevel: async () =>{
        const metadata = await MetadataService.getAndParseMetadata();
        if(metadata){
            set(() => ({
                listEducationLevel: metadata.filter(item => item.type === EDUCATIONLEVELTYPE)
            }));
        }
    },
    loadMetadataByWorkExperience: async () =>{
        const metadata = await MetadataService.getAndParseMetadata();
        if(metadata){
            set(() => ({
                listWorkExperience: metadata.filter(item => item.type === WORKEXPERIENCERETYPE)
            }));
        }
    }
}));