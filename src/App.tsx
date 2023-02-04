import "./App.less";
import router from "./router";
import { App as AntdApp } from "antd";

import AntdMessage from "./utils/Message";

import { RouterProvider } from "react-router-dom";
function App() {
  return (
    <AntdApp>
      <AntdMessage />
      <RouterProvider router={router} />
    </AntdApp>
  );
}

export default App;
