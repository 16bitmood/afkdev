import { FC } from "react";
import { WinsContextProvider } from "../contexts";
import { WindowManager } from "../components/windowmanager";

export const HomePage: FC = () => (
  <WinsContextProvider>
    <WindowManager />
  </WinsContextProvider>
);
