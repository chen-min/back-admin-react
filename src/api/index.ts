import request from "@/utils/request";

export default {
  login(params: any) {
    return request.post<string>("/users/login", params, { showLoading: false });
  },
};
