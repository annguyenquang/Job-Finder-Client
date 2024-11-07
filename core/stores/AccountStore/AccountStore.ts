import {create} from "zustand";
import {Account} from "@/models";
import {AccountService} from "@/services/AccountService";


type AccountStore = {
    account: Account
    login: (username: string, password: string) => Promise<void>

};


export const useAccountStore = create<AccountStore>()((set, getState) => ({
    account: null,
    login: async (username: string, password: string) => {
        const account = await AccountService.login(username, password);
        set(() => ({ account: account}));
    }
}));

