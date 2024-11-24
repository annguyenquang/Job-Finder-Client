import { http } from "@/services";
import { Account, ApiResult } from "@/models";

const login = async (username: string, password: string) => {

    try {
        const url = "Account/Login";
        const body = {
            username: username,
            password: password
        };
        const res = await http().post<ApiResult<Account>>(url, body);
        return res.data.result;
    } catch (e) {
        console.log(e);
        return null;
    }
}

const getAccountByCookie: () => Promise<Account | null> = async () => {
    try {
        const url = "/Account/GetAccountByJwt";
        const res = await http().get<ApiResult<Account>>(url);
        return res.data.result;
    } catch (e) {
        console.log(e);
        return null;
    }
}

export const AccountService = { login, getAccountByCookie };