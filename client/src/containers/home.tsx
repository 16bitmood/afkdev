import { FC } from "react";
import { WinsContextProvider } from "../context/windows";
import { WindowManager } from "../components/windowmanager";

export const HomePage: FC = () => (
    <WinsContextProvider>
      <WindowManager />
    </WinsContextProvider>
  );
