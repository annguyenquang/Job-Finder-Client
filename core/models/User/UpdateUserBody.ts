import { Certification } from '@/models'

export type UpdateUserBody = {
  firstName: string
  lastName: string
  dateOfBirth: string
  skills: string[]
  selfDescription: string
  certifications: Certification[]
}
