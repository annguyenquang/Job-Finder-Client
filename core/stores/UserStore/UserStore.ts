import { User } from "@/models";
import { UserService } from "@/services";
import { create } from "zustand";

type UserStore = {
    users: User[];
    loadUser: () => void;
};

export const useUserStore = create<UserStore>()((set) => ({
    users: [],
    loadUser: async () => {
        const res = await UserService.getUsers();
        set(() => ({ users: res?.data.users }));
    }
}));
