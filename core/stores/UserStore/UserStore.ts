import { Certification, UpdateUserParams, User } from '@/models'
import { UserService } from '@/services'
import { useAccountStore } from '@/stores/AccountStore'
import { create } from 'zustand'

type UserStore = {
  updateDescription: (description: string) => Promise<void>
  updateSkills: (skills: string[]) => Promise<void>
  updateCertifications: (certifications: Certification[]) => Promise<void>
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
      await UserService.updateUser(account.id, { ...user, selfDescription: description })
    } catch (error) {
      console.log(error)
    }
  },
  updateSkills: async (skills: string[]) => {
    try {
      const account = useAccountStore.getState().account
      if (!account) {
        console.log('No account found')
        return
      }
      const user = account as UpdateUserParams
      await UserService.updateUser(account.id, { ...user, skills: skills })
    } catch (error) {
      console.log(error)
    }
  },
  updateCertifications: async (certifications: Certification[]) => {
    try {
      const account = useAccountStore.getState().account
      if (!account) {
        console.log('No account found')
        return
      }
      const user = account as UpdateUserParams
      await UserService.updateUser(account.id, { ...user, certifications: certifications })
    } catch (error) {
      console.log(error)
    }
  }
}))
