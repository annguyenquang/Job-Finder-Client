import { JobSuggestion } from '@/models/SuggestionModel/JobSuggestion'

export type SuggestionResponse = {
  explanation: string
  suggestions: JobSuggestion[] | undefined
}
