import { UpdateUserParams, User } from '@/models'
import { UserService } from '@/services'
import { useAccountStore } from '@/stores/AccountStore'
import { create } from 'zustand'

type UserStore = {
  updateDescription: (description: string) => Promise<void>
}

export const useUserStore = create<UserStore>()((set) => ({
  updateDescription: async (description: string) => {
    try {
      const account = useAccountStore.getState().account
      if (!account) {
        console.log('No account found')
        return
      }
      const user = account as UpdateUserParams
      console.log('User', user)
      await UserService.updateUser(account.id, { ...user, selfDescription: description })
    } catch (error) {
      console.log(error)
    }
  }
}))
