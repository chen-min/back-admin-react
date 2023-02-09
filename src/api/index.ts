import request from "@/utils/request";
import { User, Menu } from "@/types/api";
export default {
  login(params: any) {
    return request.post<string>("/users/login", params, { showLoading: false });
  },

  getUserInfo() {
    return request.get<User.UserItem>("/users/getUserInfo");
  },
  getPermissionList() {
    return request.get<{ buttonList: string[]; menuList: Menu.MenuItem[] }>(
      "/users/getPermissionList"
    );
  },
};
