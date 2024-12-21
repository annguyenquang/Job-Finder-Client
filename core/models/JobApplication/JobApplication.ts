import { Account } from '@/models'

export type JobApplication = {
  id: string
  jobId: string
  userId: string
  cvLink: string
  coverLetter: string
  state: number
  createdAt: Date
  updatedAt: Date
  createdBy: string | null
  updatedBy: string | null
}

export type ApplicationTableData = {
  applications: JobApplication[]
  user: Account[]
}
