"use client"
import {useAccountStore} from "@/stores/AccountStore/AccountStore";
import {User} from "@/models";

const UserProfilePage:React.FC  = () =>{
    const accountStore = useAccountStore();
    return (
        <div>
            {(accountStore.account as User).firstName}
        </div>
    )
};
export default UserProfilePage;