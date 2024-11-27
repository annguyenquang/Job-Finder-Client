import { Certification } from '@/models'

export type UpdateUserParams = {
  firstName: string
  lastName: string
  dateOfBirth: Date
  skills: string[]
  selfDescription: string
  certifications: Certification[]
}
