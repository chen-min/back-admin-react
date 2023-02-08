import * as echarts from "echarts";
import { useEffect, useRef, useState, RefObject } from "react";

export const useCharts = (): [
  RefObject<HTMLDivElement>,
  echarts.EChartsType | undefined
] => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [chartIns, setChartIns] = useState<echarts.EChartsType>();
  useEffect(() => {
    const chart = echarts.init(chartRef.current as HTMLElement);
    setChartIns(chart);
  }, []);
  return [chartRef, chartIns];
};
