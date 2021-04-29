import {FC} from 'react';
import { WinsContextProvider } from "./context/windows";
import { WindowManager } from "./components/windowmanager";
import { logOut } from "./api";
import { Metadata } from "./metadata";

export const Home:FC<{}> = () => {
  return (
    <>
      <Metadata />
      <WinsContextProvider>
        <WindowManager />
      </WinsContextProvider>
    </>
  );
};
