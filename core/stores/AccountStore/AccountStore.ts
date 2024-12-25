import { create } from 'zustand'
import { Account, AccountType, CompanyAccount, UserAccount } from '@/models'
import { AccountService } from '@/services'

type AccountStoreStates = {
  account: Account
  accountType: AccountType | null
}

type AccountStoreActions = {
  login: (username: string, password: string) => Promise<Account>
  logout: () => Promise<void>
  loadAccountByJwt: () => Promise<void>
  updateAccountTypeByAccount: (account: Account) => void
}

type AccountStore = AccountStoreStates & AccountStoreActions

const initialState: AccountStoreStates = {
  account: null,
  accountType: null
}

export const useAccountStore = create<AccountStore>()((set, get) => ({
  ...initialState,
  login: async (username: string, password: string) => {
    const res = await AccountService.login(username, password)
    if (res) {
      set(() => ({ account: res }))
      get().updateAccountTypeByAccount(res)
      return res
    }
    return null
  },
  logout: async () => {
    await AccountService.logout()
    set(() => ({
      ...initialState
    }))
  },
  loadAccountByJwt: async () => {
    const account = await AccountService.getAccountByCookie()
    set(() => ({ account: account }))
    get().updateAccountTypeByAccount(account)
  },
  updateAccountTypeByAccount: (account: Account) => {
    if (isUserAccount(account)) {
      set(() => ({ accountType: AccountType.User }))
    } else if (isCompanyAccount(account)) {
      set(() => ({ accountType: AccountType.Company }))
    } else {
      set(() => ({ accountType: null }))
    }
  }
}))

const isUserAccount = (account: Account): account is UserAccount => {
  return account !== null && 'firstName' in account && 'lastName' in account && 'dateOfBirth' in account
}

const isCompanyAccount = (account: Account): account is CompanyAccount => {
  return account !== null && 'name' in account && 'emailContact' in account && 'phoneContact' in account
}
