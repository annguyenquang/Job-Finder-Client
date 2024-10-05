import type { User } from "@/models";
import { http } from "../http";

type UserResponse = {
    users: User[],
    total: number,
    skip: number,
    limit: number,
}

const getUsers = async () => {
    try {
        const url = '/users';
        const res = await http().get<UserResponse>(url);
        return res;
    } catch (error) {
        console.log(error);
    }
};


export const UserService = { getUsers };