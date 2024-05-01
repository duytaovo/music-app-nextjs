import { User } from "@prisma/client";
import { create } from "zustand";
interface useCurrentUser {
  currentUser: User | undefined;
  setCurrentUser: (user: User) => void;
}
const useCurrentUser = create<useCurrentUser>((set) => ({
  currentUser: undefined,
  setCurrentUser: (user: User) => set({ currentUser: user }),
}));

export default useCurrentUser;

