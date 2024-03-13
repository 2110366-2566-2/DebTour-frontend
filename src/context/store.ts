import {create} from "zustand";

type User = {
    username?: string;
    role: string;
    token?: string;
    image?: string;

    setUser: (user: User) => void;
};

export const useUserStore = create<User>((set) => ({
    username: undefined,
    role: "guest",
    token: undefined,
    image: undefined,
    setUser: (user: User) => set(user)
}));

