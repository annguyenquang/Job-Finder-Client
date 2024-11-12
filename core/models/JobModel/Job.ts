export type metadata = {
  type: number
  value: string
  id: string
}

export type Job = {
  id: string
  title: string
  description: string
  salary: number
  status: number
  closeDate: Date
  provinceId: number
  districtId: number
  minAgeRequirement: number
  maxAgeRequirement: number
  genderRequirement: metadata
  educationLevelRequirement: metadata
  workExperienceRequirement: metadata
  workArrangement: metadata
  commitmentType: metadata
  company: {
    name: string
    emailContact: string
    phoneContact: string
    description: string
    employeeCount: number
    provinceId: number
    districtId: number
    logo: string
    slug: string
    address: string
    website: string
    industry: string
    id: string
  }
  createdAt: Date
  updatedAt: Date
  createdBy: string | null
  updatedBy: string | null
}
