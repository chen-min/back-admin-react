import React, { useEffect, useState } from "react";
import styles from "./index.module.less";
import api from "@/api";
import { Descriptions, Card, Button } from "antd";
import { useStore } from "@/store";
import { Dashboard } from "@/types/api";
import { useCharts } from "@/hook/useCharts";

import { formatDate, formatNum, formatMoney, formatState } from "@/utils";

export default function dashboard() {
  const userInfo = useStore((state) => state.userInfo);
  console.log(userInfo, "USERinfoo00");
  const [report, setReport] = useState<Dashboard.ReportData>();
  const [lineRef, lineChart] = useCharts();
  const [pieRef1, pieChart1] = useCharts();
  const [pieRef2, pieChart2] = useCharts();
  const [radarRef, radarChart] = useCharts();
  useEffect(() => {
    renderLineChart();
    renderPieChart1();
    renderPieChart2();
    renderRadarChart();
  }, [lineChart, pieChart1, pieChart2, radarChart]);

  const renderLineChart = async () => {
    if (!lineChart) return;
    const data = await api.getLineData();
    lineChart?.setOption({
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["订单", "流水"],
      },
      grid: {
        left: 50,
        right: 50,
        bottom: 20,
      },
      xAxis: {
        data: data.label,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "订单",
          type: "line",
          data: data.order,
        },
        {
          name: "流水",
          type: "line",
          data: data.money,
        },
      ],
    });
  };

  const renderPieChart1 = async () => {
    if (!pieChart1) return;
    const data = await api.getPieCityData();
    pieChart1?.setOption({
      title: {
        text: "司机城市分布",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "城市分布",
          type: "pie",
          radius: "50%",
          data,
        },
      ],
    });
  };

  const renderPieChart2 = async () => {
    if (!pieChart2) return;
    const data = await api.getPieAgeData();
    pieChart2?.setOption({
      title: {
        text: "司机年龄分布",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "年龄分布",
          type: "pie",
          radius: [50, 180],
          roseType: "area",
          data,
        },
      ],
    });
  };

  const renderRadarChart = async () => {
    if (!radarChart) return;
    const data = await api.getRadarData();
    radarChart?.setOption({
      legend: {
        data: ["司机模型诊断"],
      },
      radar: {
        indicator: data.indicator,
      },
      series: [
        {
          name: "模型诊断",
          type: "radar",
          data: data.data,
        },
      ],
    });
  };

  // 刷新饼图
  const handleRefresh = () => {
    renderPieChart1();
    renderPieChart2();
  };

  const getReportData = async () => {
    const data = await api.getReportData();
    setReport(data);
  };
  useEffect(() => {
    getReportData();
  }, []);
  return (
    <div className={styles.dashboard}>
      <div className={styles.userInfo}>
        <img src={userInfo.userImg} className={styles.userImg} />
        <Descriptions title="欢迎新同学，每天都要开心！">
          <Descriptions.Item label="用户ID">
            {userInfo.userId}
          </Descriptions.Item>
          <Descriptions.Item label="邮箱">
            {userInfo.userEmail}
          </Descriptions.Item>
          <Descriptions.Item label="状态">
            {formatState(userInfo.state)}
          </Descriptions.Item>
          <Descriptions.Item label="手机号">
            {userInfo.mobile}
          </Descriptions.Item>
          <Descriptions.Item label="岗位">{userInfo.job}</Descriptions.Item>
          <Descriptions.Item label="部门">
            {userInfo.deptName}
          </Descriptions.Item>
        </Descriptions>
      </div>
      <div className={styles.report}>
        <div className={styles.card}>
          <div className="title">数量</div>
          <div className={styles.data}>{formatNum(report?.driverCount)}个</div>
        </div>
        <div className={styles.card}>
          <div className="title">总流水</div>
          <div className={styles.data}>{formatMoney(report?.totalMoney)}元</div>
        </div>
        <div className={styles.card}>
          <div className="title">总订单</div>
          <div className={styles.data}>{formatNum(report?.orderCount)}单</div>
        </div>
        <div className={styles.card}>
          <div className="title">城市</div>
          <div className={styles.data}>{formatNum(report?.cityNum)}座</div>
        </div>
      </div>
      <div className={styles.chart}>
        <Card
          title="订单和流水走势图"
          extra={
            <Button type="primary" onClick={renderLineChart}>
              刷新
            </Button>
          }
        >
          <div ref={lineRef} className={styles.itemChart}></div>
        </Card>
      </div>
      <div className={styles.chart}>
        <Card
          title="司机分布"
          extra={
            <Button type="primary" onClick={handleRefresh}>
              刷新
            </Button>
          }
        >
          <div className={styles.pieChart}>
            <div ref={pieRef1} className={styles.itemPie}></div>
            <div ref={pieRef2} className={styles.itemPie}></div>
          </div>
        </Card>
      </div>
      <div className={styles.chart}>
        <Card
          title="模型诊断"
          extra={
            <Button type="primary" onClick={renderRadarChart}>
              刷新
            </Button>
          }
        >
          <div ref={radarRef} className={styles.itemChart}></div>
        </Card>
      </div>
    </div>
  );
}
