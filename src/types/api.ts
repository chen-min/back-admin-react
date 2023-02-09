export interface Result<T = any> {
  code: number;
  data: T;
  msg: string;
}

export namespace Login {
  export interface params {
    userName: string;
    userPwd: string;
  }
}

export interface PageParams {
  pageNum: number;
  pageSize?: number;
}

export namespace Menu {
  export interface CreateParams {
    menuName: string;
    icon?: string;
    menuType: number;
    menuState: number;
    menuCode?: string;
    parentId?: string;
    path?: string;
    component?: string;
  }

  export interface MenuItem extends CreateParams {
    _id: string;
    createTime: string;
    buttons?: MenuItem[];
    children?: MenuItem[];
  }
}

export namespace User {
  export interface UserItem {
    _id: string;
    userId: number;
    userName: string;
    userEmail: string;
    deptId: string;
    state: number;
    mobile: string;
    job: string;
    role: number;
    roleList: string;
    createId: number;
    deptName: string;
    userImg: string;
  }
}
