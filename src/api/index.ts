import request from "@/utils/request";
import { User, Menu, Dashboard, ResultData, Dept } from "@/types/api";

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
  // 获取工作台汇总数据
  getReportData() {
    return request.get<Dashboard.ReportData>("/order/dashboard/getReportData");
  },
  // 获取折线图数据
  getLineData() {
    return request.get<Dashboard.LineData>("/order/dashboard/getLineData");
  },
  // 获取城市分布数据
  getPieCityData() {
    return request.get<Dashboard.PieData[]>("/order/dashboard/getPieCityData");
  },
  // 获取年龄分布数据
  getPieAgeData() {
    return request.get<Dashboard.PieData[]>("/order/dashboard/getPieAgeData");
  },
  // 获取折线图数据
  getRadarData() {
    return request.get<Dashboard.RadarData>("/order/dashboard/getRadarData");
  },
  // user CRUD
  getUserList(params: User.Params) {
    return request.get<ResultData<User.UserItem>>("/users/list", params);
  },
  // 创建用户
  createUser(params: User.CreateParams) {
    return request.post("/users/create", params);
  },
  // 创建用户
  editUser(params: User.EditParams) {
    return request.post("/users/edit", params);
  },
  // 删除和批量删除用户
  delUser(params: { userIds: number[] }) {
    return request.post("/users/delete", params);
  },
  getDeptList(params?: Dept.Params) {
    return request.get<Dept.DeptItem[]>("/dept/list", params);
  },
  // 菜单部分
  getMenuList(params?: Menu.Params) {
    return request.get<Menu.MenuItem[]>('/menu/list', params)
  },
  createMenu(params: Menu.CreateParams) {
    return request.post('/menu/create', params)
  },
  editMenu(params: Menu.EditParams) {
    return request.post('/menu/edit', params)
  },
  deleteMenu(params: Menu.DelParams) {
    return request.post('/menu/delete', params)
  }

};
