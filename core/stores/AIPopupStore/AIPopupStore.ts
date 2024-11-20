import { create } from 'zustand'
import { Account, AccountType, AISuggestionParam, CompanyAccount, UserAccount } from '@/models'
import { AccountService } from '@/services'

type ProcessState = 'INITIAL' | 'LOADING' | 'DONE'

type AIPopupStore = {
  reqParam: AISuggestionParam
  processState: ProcessState
  updateParam: (newParam: AISuggestionParam) => void
  updateProcessState: (newState: ProcessState) => void
}

export const useAIStore = create<AIPopupStore>()((set) => ({
  reqParam: new AISuggestionParam(),
  processState: 'INITIAL',
  updateParam: (newParam: AISuggestionParam) => {
    set({ reqParam: newParam })
  },
  updateProcessState: (newState: ProcessState) => {
    set({
      processState: newState
    })
  }
}))
