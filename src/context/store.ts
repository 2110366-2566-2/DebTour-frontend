import { create } from "zustand";

type User = {
  role: "guest" | "tourist" | "agency";
};

export const useUserStore = create<User>(() => ({
  role: "guest",
}));

