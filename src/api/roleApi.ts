import request from "@/utils/request";
import { ResultData, Role } from "@/types/api";
export default {
  getRoleList(params: Role.Params) {
    return request.get<ResultData<Role.RoleItem>>("/roles/list", params);
  },

  createRole(params: Role.CreateParams) {
    return request.post("/roles/create", params);
  },

  editRole(params: Role.EditParams) {
    return request.post("/roles/edit", params);
  },

  delRole(params: { _id: string }) {
    return request.post("/roles/delete", params);
  },

  updatePermission(params: Role.Permission) {
    return request.post("/roles/update/permission", params);
  },

  getAllRoleList() {
    return request.get<Role.RoleItem[]>("/roles/allList");
  },
};
