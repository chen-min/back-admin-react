import React, { useEffect, useState } from "react";
import { Layout, theme } from "antd";
import {
  Navigate,
  Outlet,
  useLocation,
  useRouteLoaderData,
} from "react-router-dom";
const { Header, Sider, Content } = Layout;
import styles from "./index.module.less";
import SideMenu from "./SideMenu";
import Navbar from "./Navbar";
import { IAuthLoader } from "@/router/authLoader";
import { searchRoute } from "@/utils";
import { router } from "@/router";

import { useStore } from "@/store";
import api from "@/api";
const App: React.FC = () => {
  const { collapsed, changeCollapsed, changeUserInfo } = useStore();
  const { pathname } = useLocation();

  useEffect(() => {
    getUserMethod();
  }, []);
  const getUserMethod = async () => {
    const data = await api.getUserInfo();
    changeUserInfo(data);
  };
  const data = useRouteLoaderData("layout") as IAuthLoader;
  const route = searchRoute(pathname, router);
  if (route && route.meta?.auth === false) {
    // 继续执行
  } else {
    const staticPath = ["/welcome", "/403", "/404"];
    if (
      !data.menuPathList.includes(pathname) &&
      !staticPath.includes(pathname)
    ) {
      return <Navigate to="/403" />;
    }
  }

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <SideMenu />
      </Sider>
      <Layout>
        <Navbar></Navbar>
        <div className={styles.content}>
          <div className={styles.wrapper}>
            <Outlet></Outlet>
          </div>
        </div>
      </Layout>
    </Layout>
  );
};

export default App;
