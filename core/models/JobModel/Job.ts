import { Metadata } from "../common";
import { Company } from "../CompanyModel";


export type Job = {
    id: string;
    title: string;
    description: string;
    salary: number | null;
    status: number;
    closeDate: Date;
    provinceId: number;
    districtId: number;
    minAgeRequirement: number | null;
    maxAgeRequirement: number | null;
    genderRequirement: Metadata;
    educationLevelRequirement: Metadata;
    workExperienceRequirement: Metadata;
    workArrangement: Metadata;
    commitmentType: Metadata;
    company: Company;
    skills: string[];
    createdAt: Date;
    updatedAt: Date;
    createdBy: string | null;
    updatedBy: string | null;
};