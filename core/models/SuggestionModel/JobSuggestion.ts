import { Job } from '@/models/JobModel'

export type ParsedJobSuggestion = {
  job: Job
  detailExplaintation: string
}

export type JobSuggestion = {
  jobId: string
  detailExplaination: string
}
