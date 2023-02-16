import { Form, Table, Button, Input, Select, Space, Modal } from "antd";
import { useAntdTable } from "ahooks";
import api from "@/api";
import { ColumnsType } from "antd/es/table";
import { Order } from "@/types/api";
import { useRef } from "react";
import { formatDate, formatMoney } from "@/utils";
import Column from "antd/es/table/Column";
import OrderModal from "./orderModal";
import { message } from "@/utils/Message";

export default function OrderList() {
  const [form] = Form.useForm();
  const orderRef = useRef<{ open: () => void }>();
  const getData = (
    { current, pageSize }: { current: number; pageSize: number },
    formData: Order.SearchParams
  ) => {
    return api
      .getOrderList({
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
    defaultParams: [{ current: 1, pageSize: 10 }, { state: 1 }],
  });
  const handleAdd = () => {
    orderRef.current?.open();
  };
  const handleDel = (_id: string) => {
    Modal.confirm({
      title: "确认",
      content: <span>确认删除订单吗？</span>,
      onOk: async () => {
        await api.delOrder(_id);
        message.success("删除成功");
        search.submit();
      },
    });
  };
  const columns: ColumnsType<Order.OrderItem> = [
    {
      title: "订单编号",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "城市",
      dataIndex: "cityName",
      key: "cityName",
      width: 80,
    },
    {
      title: "下单地址",
      dataIndex: "startAddress",
      key: "startAddress",
      width: 160,
      render(_, record) {
        return (
          <div>
            <p>开始地址：{record.startAddress}</p>
            <p>结束地址：{record.endAddress}</p>
          </div>
        );
      },
    },
    {
      title: "下单时间",
      dataIndex: "createTime",
      key: "createTime",
      width: 120,
      render(createTime) {
        return formatDate(createTime);
      },
    },
    {
      title: "订单价格",
      dataIndex: "orderAmount",
      key: "orderAmount",
      render(orderAmount) {
        return formatMoney(orderAmount);
      },
    },
    {
      title: "订单状态",
      dataIndex: "state",
      key: "state",
      render(state) {
        if (state === 1) return "进行中";
        if (state === 2) return "已完成";
        if (state === 3) return "超时";
        if (state === 4) return "取消";
      },
    },
    {
      title: "用户名称",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "司机名称",
      dataIndex: "driverName",
      key: "driverName",
    },
    {
      title: "操作",
      key: "action",
      render(_, record) {
        return (
          <Space>
            <Button type="text" danger onClick={() => handleDel(record._id)}>
              删除
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <div className="OrderList">
      <Form className="search-form" form={form} layout="inline">
        <Form.Item name="orderId" label="订单ID">
          <Input placeholder="请输入订单ID" />
        </Form.Item>
        <Form.Item name="userName" label="用户名称">
          <Input placeholder="请输入用户名称" />
        </Form.Item>
        <Form.Item name="state" label="订单状态">
          <Select style={{ width: 120 }}>
            <Select.Option value={1}>进行中</Select.Option>
            <Select.Option value={2}>已完成</Select.Option>
            <Select.Option value={3}>超时</Select.Option>
            <Select.Option value={4}>取消</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" onClick={search.submit}>
              搜索
            </Button>
            <Button type="default" onClick={search.reset}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <div className="base-table">
        <div className="header-wrapper">
          <div className="title">用户列表</div>
          <div className="action">
            <Button type="primary" onClick={handleAdd}>
              新增
            </Button>
            <Button>导出</Button>
          </div>
        </div>
        <Table bordered rowKey="_id" columns={columns} {...tableProps} />
      </div>
      <OrderModal mRef={orderRef} update={search.submit} />
    </div>
  );
}
