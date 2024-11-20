import { create } from 'zustand'
import { Account, AccountType, AISuggestionParam, CompanyAccount, UserAccount } from '@/models'
import { AccountService } from '@/services'

type AIPopupStore = {
  reqParam: AISuggestionParam

  updateParam: (newParam: AISuggestionParam) => void // Update param state
}

export const useAIStore = create<AIPopupStore>()((set) => ({
  reqParam: new AISuggestionParam(),

  updateParam: (newParam: AISuggestionParam) => {
    set({ reqParam: newParam })
  }
}))
