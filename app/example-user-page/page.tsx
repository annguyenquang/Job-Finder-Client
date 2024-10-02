'use client'
import { useEffect, useState } from "react";
import http from '../../core/http/http';
import { useRouter } from "next/navigation";
import UserTable from "@/components/example-user-page/UserTable";
import { Button } from "@mui/material";
import type { User } from "@/core/models/example-user-page/User";

export default function User() {
    const router = useRouter()
    const [users, setUsers] = useState<User[]>([]);
    const loadUsers = async () => {

        try {
            const url = '/users';
            const res = await http().get(url);
            setUsers(res.data.users as User[]);
            console.log("🚀 ~ loadUsers ~ res.data:", res.data)
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(()=>{
        loadUsers();
    }, [])

    return (
        <div>
            <h1 className="text-6xl">This is /user</h1>
            <UserTable users={users}/>
            <Button onClick={()=> {router.push("/")}} variant="outlined">This is button</Button>
        </div>
    );
}