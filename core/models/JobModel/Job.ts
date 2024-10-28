import { JobStatus } from './JobStatus'
type Requirement = {
  type: number
  value: string
  id: string
}
export type Job = {
  id: string
  title: string
  description: string
  salary: number
  status: JobStatus
  closeDate: Date
  provinceId: number
  districtId: number
  minAgeRequirement: 0
  maxAgeRequirement: 0
  genderRequirement: Requirement
  educationLevelRequirement: Requirement
  workExperienceRequirement: Requirement
  workArrangement: Requirement
  commitmentType: Requirement
  companyId: string
  createdAt: Date
  updatedAt: Date
  createdBy: string
  updatedBy: string
}
