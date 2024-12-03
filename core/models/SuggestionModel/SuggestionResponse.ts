import { JobSuggestion } from '@/models/SuggestionModel/JobSuggestion'

export type SuggestionResponse = {
  explaination: string
  suggestions: JobSuggestion[]
}
