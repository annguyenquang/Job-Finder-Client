import { create } from 'zustand'
import {
  Account,
  AccountType,
  AISuggestionParam,
  CompanyAccount,
  Job,
  JobSuggestion,
  ParsedJobSuggestion,
  UserAccount
} from '@/models'
import { AccountService } from '@/services'

type ProcessState = 'INITIAL' | 'LOADING' | 'DONE'

type AIPopupStore = {
  reqParam: AISuggestionParam
  processState: ProcessState
  suggestionJobs: ParsedJobSuggestion[]
  overallExplanation: string
  updateOverallExplanation: (newExplanation: string) => void
  updateSuggestionJobs: (newJobs: ParsedJobSuggestion[]) => void
  updateParam: (newParam: AISuggestionParam) => void
  updateProcessState: (newState: ProcessState) => void
}

export const useAIStore = create<AIPopupStore>()((set) => ({
  reqParam: new AISuggestionParam(),
  processState: 'INITIAL',
  suggestionJobs: [],
  overallExplanation: '',
  updateOverallExplanation: (newExplanation: string) => {
    set({ overallExplanation: newExplanation })
  },
  updateSuggestionJobs: (newJobs: ParsedJobSuggestion[]) => {
    set({ suggestionJobs: newJobs })
  },
  updateParam: (newParam: AISuggestionParam) => {
    set({ reqParam: newParam })
  },
  updateProcessState: (newState: ProcessState) => {
    set({
      processState: newState
    })
  }
}))
