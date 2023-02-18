import { Modal, Form, Input, Select, Upload, TreeSelect } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useImperativeHandle, useState } from "react";
import storage from "@/utils/storage";
import { message } from "@/utils/Message";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { IAction, IModalProp } from "@/types/modal";
import { Dept, Role, User } from "@/types/api";
import api from "@/api";

export default function userModal(props: any) {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState<IAction>("create");
  const [deptList, setDeptList] = useState<Dept.DeptItem[]>([]);
  const [roleList, setRoleList] = useState<Role.RoleItem[]>([]);
  useEffect(() => {
    getDeptList();
    getRoleList();
  }, []);
  const getDeptList = async () => {
    const list = await api.getDeptList();
    setDeptList(list);
  };

  // 获取角色列表
  const getRoleList = async () => {
    const list = await api.getAllRoleList();
    setRoleList(list);
  };

  const open = (type: IAction, data?: User.UserItem) => {
    setAction(type);
    setVisible(true);
    if (type === "edit" && data) {
      form.setFieldsValue(data);
      setImg(data.userImg);
    }
  };
  const handleSubmit = async () => {
    const valid = await form.validateFields();

    setVisible(false);
    if (valid) {
      const params = {
        ...form.getFieldsValue(),
        userImg: img,
      };
      if (action === "create") {
        await api.createUser(params);
        message.success("创建成功");
      } else {
        await api.editUser(params);
        message.success("修改成功");
      }
      handleCancel();
      props.update();
    }
  };
  const handleCancel = () => {
    setVisible(false);
    setImg("");
    form.resetFields();
  };
  useImperativeHandle(props.mRef, () => {
    return {
      open,
    };
  });
  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("只能上传png或jpeg格式的图片");
      return false;
    }
    const isLt500K = file.size / 1024 / 1024 < 0.5;
    if (!isLt500K) {
      message.error("图片不能超过500K");
    }
    return isJpgOrPng && isLt500K;
  };

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      setLoading(false);
      const { code, data, msg } = info.file.response;
      if (code === 0) {
        setImg(data.file);
      } else {
        message.error(msg);
      }
    } else if (info.file.status === "error") {
      message.error("服务器异常，请稍后重试");
    }
  };

  return (
    <Modal
      title={action === "create" ? "创建用户" : "编辑用户"}
      okText="确定"
      cancelText="取消"
      width={800}
      open={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form form={form} labelCol={{ span: 4 }} labelAlign="right">
        <Form.Item name="userId" hidden>
          <Input />
        </Form.Item>
        <Form.Item
          label="用户名称"
          name="userName"
          rules={[
            { required: true, message: "请输入用户名称" },
            { min: 5, max: 12, message: "用户名称最小5个字符，最大12个字符" },
          ]}
        >
          <Input placeholder="请输入用户名称"></Input>
        </Form.Item>
        <Form.Item
          label="用户邮箱"
          name="userEmail"
          rules={[
            { required: true, message: "请输入用户邮箱" },
            { type: "email", message: "请输入正确的邮箱" },
            {
              pattern: /^\w+@mars.com$/,
              message: "邮箱必须以@mars.com结尾",
            },
          ]}
        >
          <Input
            placeholder="请输入用户邮箱"
            disabled={action === "edit"}
          ></Input>
        </Form.Item>
        <Form.Item
          label="手机号"
          name="mobile"
          rules={[
            { len: 11, message: "请输入11位手机号" },
            { pattern: /1[1-9]\d{9}/, message: "请输入1开头的11位手机号" },
          ]}
        >
          <Input type="number" placeholder="请输入手机号"></Input>
        </Form.Item>
        <Form.Item
          label="部门"
          name="deptId"
          rules={[
            {
              required: true,
              message: "请选择部门",
            },
          ]}
        >
          <TreeSelect
            placeholder="请选择部门"
            allowClear
            treeDefaultExpandAll
            showCheckedStrategy={TreeSelect.SHOW_ALL}
            fieldNames={{ label: "deptName", value: "_id" }}
            treeData={deptList}
          />
        </Form.Item>
        <Form.Item label="岗位" name="job">
          <Input placeholder="请输入岗位"></Input>
        </Form.Item>
        <Form.Item label="状态" name="state">
          <Select>
            <Select.Option value={1}>在职</Select.Option>
            <Select.Option value={2}>离职</Select.Option>
            <Select.Option value={3}>试用期</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="系统角色" name="roleList">
          <Select placeholder="请选择角色">
            {roleList.map((item) => {
              return (
                <Select.Option value={item._id} key={item._id}>
                  {item.roleName}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="用户头像">
          <Upload
            listType="picture-circle"
            showUploadList={false}
            headers={{
              Authorization: "Bearer " + storage.get("token"),
              icode: "B815F86524423DB0",
            }}
            action="/api/users/upload"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {img ? (
              <img src={img} style={{ width: "100%", borderRadius: "100%" }} />
            ) : (
              <div>
                {loading ? (
                  <LoadingOutlined rev={undefined} />
                ) : (
                  <PlusOutlined rev={undefined} />
                )}
                <div style={{ marginTop: 5 }}>上传头像</div>
              </div>
            )}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}
