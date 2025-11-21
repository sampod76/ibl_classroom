"use client";
import { store } from "@/redux/store";
import { StyleProvider } from "@ant-design/cssinjs";

import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import StyledComponentsRegistry from "./AntdRegistry";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <StyledComponentsRegistry>
        <StyleProvider hashPriority="high">
          <ConfigProvider>{children}</ConfigProvider>
        </StyleProvider>
      </StyledComponentsRegistry>
    </Provider>
  );
};

export default Providers;
