"use client"
import {useAccountStore} from "@/stores/AccountStore/AccountStore";
import {UserAccount} from "@/models";

const UserProfilePage:React.FC  = () =>{
    const accountStore = useAccountStore();
    return (
        <div>
            {(accountStore.account as UserAccount).firstName}
        </div>
    )
};
export default UserProfilePage;