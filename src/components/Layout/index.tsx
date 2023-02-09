import React, { useEffect, useState } from "react";
import { Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
const { Header, Sider, Content } = Layout;
import styles from "./index.module.less";
import SideMenu from "./SideMenu";
import Navbar from "./Navbar";
import { useStore } from "@/store";
import api from "@/api";
const App: React.FC = () => {
  const { collapsed, changeCollapsed, changeUserInfo } = useStore();
  useEffect(() => {
    getUserMethod();
  }, []);
  const getUserMethod = async () => {
    const data = await api.getUserInfo();
    changeUserInfo(data);
  };
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
