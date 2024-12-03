import { Job } from '@/models/JobModel'

export type ParsedJobSuggestion = {
  job: Job | undefined
  detailExplanation: string
}

export type JobSuggestion = {
  jobId: string
  detailExplanation: string
}
