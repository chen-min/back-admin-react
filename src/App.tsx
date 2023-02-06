import "./App.less";
import router from "./router";
import { ConfigProvider, App as AntdApp, theme } from "antd";

import AntdMessage from "./utils/Message";

import { RouterProvider } from "react-router-dom";
function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#2254a4",
        },
        algorithm: theme.darkAlgorithm,
        // theme.defaultAlgorithm,
      }}
    >
      <AntdApp>
        <AntdMessage />
        <RouterProvider router={router} />
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
