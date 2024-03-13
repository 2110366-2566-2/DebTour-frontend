import { create } from "zustand";

type User = {
  role: "guest" | "tourist" | "agency" | "admin";
};

export const useUserStore = create<User>(() => ({
  // role: "guest",
    role: "tourist",
}));

