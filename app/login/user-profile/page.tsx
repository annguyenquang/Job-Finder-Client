"use client"
import {useAccountStore} from "@/stores";
import {AccountType, CompanyAccount, UserAccount} from "@/models";
import React from "react";

const UserProfilePage:React.FC  = () =>{
    const accountStore = useAccountStore();
    React.useEffect(() => {
        accountStore.loadAccountByJwt();
    }, [])
   React.useEffect(() => {
       console.log(accountStore.account)
   }, [accountStore.account])
    return (
        <div>
            {accountStore.accountType == AccountType.User && (accountStore.account as UserAccount)?.firstName}
            {accountStore.accountType == AccountType.Company && (accountStore.account as CompanyAccount)?.name}
        </div>
    )
};
export default UserProfilePage;