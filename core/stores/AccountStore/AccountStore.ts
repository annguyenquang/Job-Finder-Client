import {create} from "zustand";
import {Account, AccountType, CompanyAccount, UserAccount} from "@/models";
import {AccountService} from "@/services";


type AccountStore = {
    account: Account
    accountType: AccountType | null
    login: (username: string, password: string) => Promise<void>
    loadAccountByJwt: () => Promise<void>
};


export const useAccountStore = create<AccountStore>()((set) => ({
    account: null,
    accountType: null,
    login: async (username: string, password: string) => {
        await AccountService.login(username, password);
    },
    loadAccountByJwt: async () => {
        const account = await AccountService.getAccountByCookie();
        if(isUserAccount(account)) {
            set(() => ({accountType: AccountType.User}))
        } else if (isCompanyAccount(account)) {
            set(() => ({accountType: AccountType.Company}))
        } else {
            set(() => ({accountType: null}))
        }
        set(() => ({account: account}));
    }
}));

const isUserAccount = (account: Account): account is UserAccount => {
    return (
        account !== null &&
        'firstName' in account &&
        'lastName' in account &&
        'dateOfBirth' in account
    );
}

const isCompanyAccount = (account: Account): account is CompanyAccount => {
    return (
        account !== null &&
        'name' in account &&
        'emailContact' in account &&
        'phoneContact' in account
    );
}

