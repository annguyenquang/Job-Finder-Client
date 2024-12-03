import { create } from 'zustand'
import { Account, AccountType, AISuggestionParam, CompanyAccount, Job, UserAccount } from '@/models'
import { AccountService } from '@/services'

type ProcessState = 'INITIAL' | 'LOADING' | 'DONE'

type AIPopupStore = {
  reqParam: AISuggestionParam
  processState: ProcessState
  suggestionJobs: Job[]
  updateParam: (newParam: AISuggestionParam) => void
  updateProcessState: (newState: ProcessState) => void
}

export const useAIStore = create<AIPopupStore>()((set) => ({
  reqParam: new AISuggestionParam(),
  processState: 'INITIAL',
  suggestionJobs: [],
  updateSuggestionJobs: (newJobs: Job[]) => {
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
