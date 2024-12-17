export type JobApplication = {
  id: string
  JobId: string
  UserId: string
  CVLink: string
  CoverLetter: string
  state: number
  createdAt: Date
  updatedAt: Date
  createdBy: string | null
  updatedBy: string | null
}
