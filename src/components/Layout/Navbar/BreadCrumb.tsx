import { IAuthLoader } from "@/router/authLoader";
import { findBreadCrumb } from "@/utils";
import { Breadcrumb } from "antd";
import { ReactNode, useEffect, useState } from "react";
import { useLocation, useRouteLoaderData } from "react-router-dom";

export default function BreadCrumb() {
  const { pathname } = useLocation();
  const [breadList, setBreadList] = useState<(string | ReactNode)[]>([]);

  const data = useRouteLoaderData("layout") as IAuthLoader;

  useEffect(() => {
    const list = findBreadCrumb(data.menuList, pathname, []);
    setBreadList([<a href="/welcome">首页</a>, ...list]);
  }, [pathname]);
  return (
    <Breadcrumb
      items={breadList.map((item) => ({ title: item }))}
      style={{ marginLeft: 10 }}
    />
  );
}
