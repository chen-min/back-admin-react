import Login from "@/views/login/Login";
import Welcome from "@/views/welcome/Welcome";
import P403 from "@/views/403/403";
import P404 from "@/views/404/404";
import { Navigate, createBrowserRouter } from "react-router-dom";

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
    path: "/welcome",
    element: <Welcome />,
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
