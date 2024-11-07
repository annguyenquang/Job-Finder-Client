"use client"
import {useAccountStore} from "@/stores/AccountStore/AccountStore";
import {CompanyAccount, UserAccount} from "@/models";
import React from "react";
import {AccountType} from "@/models/Account/AccountType";

const UserProfilePage:React.FC  = () =>{
    const accountStore = useAccountStore();
    React.useEffect(() => {
        accountStore.loadAccountByJwt();
    }, [])
   React.useEffect(() => {
       console.log()
   }, [accountStore.account])
    return (
        <div>
            {accountStore.accountType == AccountType.User && (accountStore.account as UserAccount)?.firstName}
            {accountStore.accountType == AccountType.Company && (accountStore.account as CompanyAccount)?.name}
        </div>
    )
};
export default UserProfilePage;