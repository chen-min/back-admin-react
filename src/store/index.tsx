import { create } from "zustand";
import storage from "@/utils/storage";
import { User } from "@/types/api";

export const useStore = create<{
  token: string;
  userInfo: User.UserItem;
  collapsed: boolean;
  chageToken: (token: string) => void;
  changeUserInfo: (userInfo: User.UserItem) => void;
  changeCollapsed: () => void;
}>((set) => ({
  token: "",
  userInfo: {
    _id: "",
    userId: 0,
    userName: "",
    userEmail: "",
    deptId: "",
    state: 0,
    mobile: "",
    job: "",
    role: 0,
    roleList: "",
    createId: 0,
    deptName: "",
    userImg: "",
  },
  collapsed: false,
  chageToken: (token) => set({ token }),
  changeUserInfo: (userInfo: User.UserItem) => set({ userInfo }),
  changeCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),
}));
