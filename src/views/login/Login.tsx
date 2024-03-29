import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import styles from "./login.module.less";
import api from "@/api";
import { Login } from "@/types/api";
import storage from "@/utils/storage";
// import { useStore } from "@/store";
export default function LoginFC() {
  const [loading, setLoading] = useState(false);
  // const updateToken = useStore((state) => state.updateToken);
  const onFinish = async (values: Login.params) => {
    try {
      setLoading(true);
      const data = await api.login(values);
      setLoading(false);
      storage.set("token", data);
      // updateToken(data);
      message.success("登录成功");
      const params = new URLSearchParams(location.search);
      setTimeout(() => {
        location.href = params.get("callback") || "/welcome";
      });
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <div className={styles.login}>
      <div className={styles.loginWrapper}>
        <div className={styles.title}>SYSTEM LOGIN</div>
        <Form
          name="basic"
          initialValues={{ userName: 475721797, userPwd: 123456 }}
          onFinish={onFinish}
          autoComplete="off"
          size="large"
        >
          <Form.Item
            label="Username"
            name="userName"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="userPwd"
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" block htmlType="submit" loading={loading}>
              SUBMIT
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
