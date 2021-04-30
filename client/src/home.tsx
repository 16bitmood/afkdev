import { FC } from "react";
import { WinsContextProvider } from "./context/windows";
import { WindowManager } from "./components/windowmanager";

export const Home: FC<{}> = () => {
  return (
    <WinsContextProvider>
      <WindowManager />
    </WinsContextProvider>
  );
};
