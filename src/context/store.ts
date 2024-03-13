import { create } from "zustand";

type User = {
  id: string;
  token?: string;
};

export const useUserStore = create<User>(() => ({
  id: "guest",
  token: undefined,
  setUser: (user: User) => user,
}));

