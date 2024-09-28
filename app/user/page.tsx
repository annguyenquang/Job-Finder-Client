'use client'
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import http from '../../core/http/http';
type User = {
    id:string,
    firstName: string,
    lastName: string,
    age: number,
};

export default function Page() {
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
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>FirstName</TableCell>
                            <TableCell>LastName</TableCell>
                            <TableCell>Age</TableCell>
                        </TableRow>
                    </TableHead>
                        <TableBody>
                            {users.map(u => 
                                <TableRow key={u.id}>
                                    <TableCell>{u.id}</TableCell>
                                    <TableCell>{u.firstName}</TableCell>
                                    <TableCell>{u.lastName}</TableCell>
                                    <TableCell>{u.age}</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                </Table>
            </TableContainer>
            <Button variant="outlined">This is button</Button>
        </div>
    );
}