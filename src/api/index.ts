import request from "@/utils/request";
import {
  Order,
  User,
  Menu,
  Role,
  Dashboard,
  ResultData,
  Dept,
} from "@/types/api";

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
    return request.get<Menu.MenuItem[]>("/menu/list", params);
  },
  createMenu(params: Menu.CreateParams) {
    return request.post("/menu/create", params);
  },
  editMenu(params: Menu.EditParams) {
    return request.post("/menu/edit", params);
  },
  deleteMenu(params: Menu.DelParams) {
    return request.post("/menu/delete", params);
  },
  createDept(params: Dept.CreateParams) {
    return request.post("/dept/create", params);
  },
  // 修改部门
  eidtDept(params: Dept.EditParams) {
    return request.post("/dept/edit", params);
  },
  // 删除部门
  deleteDept(params: Dept.DelParams) {
    return request.post("/dept/delete", params);
  },
  getAllUserList() {
    return request.get<User.UserItem[]>("/users/all/list");
  },

  getOrderList(params: Order.Params) {
    return request.get<ResultData<Order.OrderItem>>("/order/list", params);
  },
  // 获取城市列表
  getCityList() {
    return request.get<Order.DictItem[]>("/order/cityList");
  },
  // 获取车型列表
  getVehicleList() {
    return request.get<Order.DictItem[]>("/order/vehicleList");
  },
  // 创建订单
  createOrder(params: Order.CreateParams) {
    return request.post("/order/create", params);
  },
  // 获取订单详情
  getOrderDetail(orderId: string) {
    return request.get<Order.OrderItem>(`/order/detail/${orderId}`);
  },
  // 更新订单信息
  updateOrderInfo(params: Order.OrderRoute) {
    return request.post("/order/edit", params);
  },
  // 删除订单
  delOrder(orderId: string) {
    return request.post("/order/delete", { _id: orderId });
  },
  // 获取城市聚合点数据
  getCityData(cityId: number) {
    return request.get<Array<{ lng: string; lat: string }>>(
      `/order/cluster/${cityId}`
    );
  },
  // 获取司机列表
  getDrvierList(params: Order.DriverParams) {
    return request.get<ResultData<Order.DriverItem>>(
      "/order/driver/list",
      params
    );
  },

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
