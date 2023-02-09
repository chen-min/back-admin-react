import React, { useEffect } from "react";
import { Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styles from "./index.module.less";
import { useLocation, useNavigate, useRouteLoaderData } from "react-router-dom";
import { useStore } from "@/store";
import type { MenuProps } from "antd/es/menu";
import { Menu as IMenu } from "@/types/api";
import * as Icons from "@ant-design/icons";
import { useState } from "react";

export default function SideMenu() {
  type MenuItem = Required<MenuProps>["items"][number];
  const navigate = useNavigate();
  const { collapsed } = useStore();
  const data: any = useRouteLoaderData("layout");
  const [menuList, setMenuList] = useState<MenuItem[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const { pathname } = useLocation();

  function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      label,
      key,
      icon,
      children,
    } as MenuItem;
  }
  function createIcon(name?: string) {
    if (!name) return <></>;
    const customerIcons: { [key: string]: any } = Icons;
    const icon = customerIcons[name];
    if (!icon) return <></>;
    return React.createElement(icon);
  }

  const getTreeMenu = (
    menuList: IMenu.MenuItem[],
    treeList: MenuItem[] = []
  ) => {
    menuList.forEach((item, index) => {
      if (item.menuType === 1 && item.menuState === 1) {
        if (item.buttons)
          return treeList.push(
            getItem(item.menuName, item.path || index, createIcon(item.icon))
          );
        treeList.push(
          getItem(
            item.menuName,
            item.path || index,
            createIcon(item.icon),
            getTreeMenu(item.children || [])
          )
        );
      }
    });
    return treeList;
  };

  useEffect(() => {
    const treeMenuList = getTreeMenu(data.menuList);
    setMenuList(treeMenuList);
    setSelectedKeys([pathname]);
  }, []);

  const handleClick = ({ key }: { key: string }) => {
    setSelectedKeys([key]);
    navigate(key);
  };

  return (
    <div>
      <div className={styles.title}>BACK-ADMIN</div>
      <Menu theme="dark" mode="inline" onClick={handleClick} items={menuList} />
    </div>
  );
}
