import { Certification } from '@/models'

export type UpdateUserBody = {
  firstName: string
  lastName: string
  dateOfBirth: string
  skills: string[]
  selfDescription: string
  certifications: UpdateUserBodyCertification[]
}

type UpdateUserBodyCertification = {
  name: string
  issuingOrganization: string
  issueDate?: string
  expirationDate?: string
  credentialId?: string
  credentialUrl?: string
}
