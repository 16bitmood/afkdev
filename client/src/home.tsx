import { WinsContextProvider } from "./context/windows";
import { WindowManager } from "./components/windowmanager";

export const Home = () => {
  return (
    <WinsContextProvider>
      <WindowManager />
    </WinsContextProvider>
  );
};
