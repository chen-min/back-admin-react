import Login from "@/views/login/Login";
import Welcome from "@/views/welcome/Welcome";
import P403 from "@/views/403/403";
import P404 from "@/views/404/404";
import { Navigate, createBrowserRouter } from "react-router-dom";
import Layout from "@/components/Layout";
import AuthLoader from "./authLoader";
import { Spin } from "antd";
import React, { Suspense, ReactNode } from "react";
const lazyLoad = (
  Component: React.LazyExoticComponent<() => JSX.Element>
): ReactNode => {
  return (
    <Suspense
      fallback={
        <Spin
          size="large"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        />
      }
    >
      <Component />
    </Suspense>
  );
};

export const router = [
  {
    path: "/",
    element: <Navigate to="/welcome" />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    id: "layout",
    element: <Layout />,
    loader: AuthLoader,
    children: [
      {
        path: "/welcome",
        element: <Welcome />,
      },
      {
        path: "/dashboard",
        element: lazyLoad(React.lazy(() => import("@/views/dashboard"))),
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/404" />,
  },
  {
    path: "/404",
    element: <P404 />,
  },
  {
    path: "/403",
    element: <P403 />,
  },
];

export default createBrowserRouter(router);
