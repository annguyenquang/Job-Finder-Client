import { Job } from '../JobModel/Job'
import { JobApplicationState } from './JobApplicationState'
export type UserJobApplication = {
  job: Job
  userId: string
  cvLink: string
  coverLetter: string
  state: JobApplicationState
  id: string
  createdAt: Date | null
  updatedAt: Date | null
  createdBy: string | null
  updatedBy: string | null
}
