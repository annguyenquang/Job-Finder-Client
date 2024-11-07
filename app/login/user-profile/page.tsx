"use client"
import {useAccountStore} from "@/stores/AccountStore/AccountStore";
import {User} from "@/models";
import {useEffect} from "react";

const UserProfilePage:React.FC  = () =>{
    const accountStore = useAccountStore();
    useEffect(() => {
        console.log("account:",accountStore.account);
    }, []);
    return (
        <div>
            {(accountStore.account as User).firstName}
        </div>
    )
};
export default UserProfilePage;