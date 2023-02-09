import { Layout, Button, Dropdown } from "antd";
import type { MenuProps } from "antd";
const { Header, Sider, Content } = Layout;
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useStore } from "@/store";
import BreadCrumb from "./BreadCrumb";
import styles from "./index.module.less";
import storage from "@/utils/storage";

export default function Navbar() {
  const { collapsed, changeCollapsed, userInfo } = useStore();
  const items: MenuProps["items"] = [
    {
      key: "email",
      label: "邮箱：" + userInfo.userEmail,
    },
    {
      key: "logout",
      label: "退出",
    },
  ];

  const setCollapsed = () => {
    changeCollapsed();
  };
  const onClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "logout") {
      storage.remove("token");
      location.href = "/login?callback=" + encodeURIComponent(location.href);
    }
  };
  return (
    <Header
      style={{ padding: 0, background: "#fff" }}
      className={styles.navContainer}
    >
      <div className={styles.headerLeft}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed()}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
        <BreadCrumb />
      </div>
      <div className={styles.headerRight}>
        <Dropdown menu={{ items, onClick }} trigger={["click"]}>
          <span className={styles.nickName}>{userInfo.userName} </span>
        </Dropdown>
      </div>
    </Header>
  );
}
