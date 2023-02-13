import React, { useState, useRef } from "react";
import { useAntdTable } from "ahooks";
import { Button, Table, Form, Input, Select, Space, Modal } from "antd";
import api from "@/api/roleApi";
import type { ColumnsType } from "antd/es/table";
import { formatDate } from "@/utils";
import SearchForm from "@/components/SearchForm";
import { Role } from "@/types/api";
import AuthButton from "@/components/AuthButton";
import { message } from "@/utils/Message";
import { IAction } from "@/types/modal";
import PermissionModal from "./permissionModal";
import RoleModal from "./roleModal";

export default function RoleList() {
  const [form] = Form.useForm();
  const roleRef = useRef<{
    open: (type: IAction, data?: Role.RoleItem) => void;
  }>();
  const permissionRef = useRef<{
    open: (type: IAction, data?: Role.RoleItem) => void;
  }>();

  const columns: ColumnsType<Role.RoleItem> = [
    {
      title: "角色名称",
      dataIndex: "roleName",
      key: "roleName",
    },
    {
      title: "备注",
      dataIndex: "remark",
      key: "remark",
    },
    {
      title: "更新时间",
      dataIndex: "updateTime",
      key: "updateTime",
      render(updateTime: Date) {
        return formatDate(updateTime);
      },
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
      render(createTime: Date) {
        return formatDate(createTime);
      },
    },
    {
      title: "操作",
      key: "action",
      render(_, record) {
        return (
          <Space>
            <Button type="text" onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button type="text" onClick={() => handleSetPermission(record)}>
              设置权限
            </Button>
            <Button type="text" onClick={() => handleDelete(record._id)} danger>
              删除
            </Button>
          </Space>
        );
      },
    },
  ];

  const getData = (
    { current, pageSize }: { current: number; pageSize: number },
    formData: Role.Params
  ) => {
    return api
      .getRoleList({
        ...formData,
        pageNum: current,
        pageSize: pageSize,
      })
      .then((data) => {
        return {
          total: data.page.total,
          list: data.list,
        };
      });
  };
  const { tableProps, search } = useAntdTable(getData, {
    form,
    defaultPageSize: 10,
  });
  const handleCreate = () => {
    roleRef.current?.open("create");
  };
  const handleEdit = (record: Role.RoleItem) => {
    roleRef.current?.open("edit", record);
  };

  const handleDelete = (_id: string) => {
    Modal.confirm({
      title: "删除确认",
      content: <span>确认删除该角色吗？</span>,
      async onOk() {
        await api.delRole({ _id });
        message.success("删除成功");
        search.submit();
      },
    });
  };
  const handleSetPermission = (record: Role.RoleItem) => {
    permissionRef.current?.open("edit", record);
  };

  return (
    <div>
      <SearchForm
        form={form}
        initialValues={{ state: 1 }}
        submit={search.submit}
        reset={search.reset}
      >
        <Form.Item name="roleName" label="角色名称">
          <Input placeholder="请输入角色名称" />
        </Form.Item>
      </SearchForm>
      <div className="base-table">
        <div className="header-wrapper">
          <div className="title">角色列表</div>
          <div className="action">
            <AuthButton
              auth="role@create"
              type="primary"
              onClick={handleCreate}
            >
              新增
            </AuthButton>
          </div>
        </div>
        <Table bordered rowKey="_id" columns={columns} {...tableProps} />
      </div>
      <RoleModal mRef={roleRef} update={search.submit} />
      <PermissionModal mRef={permissionRef} update={search.submit} />
    </div>
  );
}
