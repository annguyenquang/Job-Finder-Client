import { create } from 'zustand'
import { Account, AccountType, CompanyAccount, UserAccount } from '@/models'
import { AccountService } from '@/services'

type AccountStore = {
  account: Account
  accountType: AccountType | null
  login: (username: string, password: string) => Promise<Account>
  loadAccountByJwt: () => Promise<void>
}

export const useAccountStore = create<AccountStore>()((set) => ({
  account: null,
  accountType: null,
  login: async (username: string, password: string) => {
    const res = await AccountService.login(username, password)
    if (res) {
      set(() => ({ account: res }))
      return res
    }
    return null
  },
  loadAccountByJwt: async () => {
    const account = await AccountService.getAccountByCookie()
    if (isUserAccount(account)) {
      account.dateOfBirth = new Date(account.dateOfBirth)
      set(() => ({ accountType: AccountType.User }))
    } else if (isCompanyAccount(account)) {
      set(() => ({ accountType: AccountType.Company }))
    } else {
      set(() => ({ accountType: null }))
    }
    set(() => ({ account: account }))
  }
}))

const isUserAccount = (account: Account): account is UserAccount => {
  return account !== null && 'firstName' in account && 'lastName' in account && 'dateOfBirth' in account
}

const isCompanyAccount = (account: Account): account is CompanyAccount => {
  return account !== null && 'name' in account && 'emailContact' in account && 'phoneContact' in account
}
