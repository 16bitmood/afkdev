import { createContext, FC, useContext, useEffect, useState } from "react";

import { WinsContext } from "./windows";

export type TaskbarContextType = {
  showMenu: boolean;
  setShowMenu: (to: boolean) => void;
  toggleShowMenu: () => void;
};

export const initialTaskbarContext: TaskbarContextType = {
  showMenu: false,
  setShowMenu: () => {},
  toggleShowMenu: () => {},
};

export const TaskbarContext = createContext(initialTaskbarContext);

export const TaskbarContextProvider: FC = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { wins } = useContext(WinsContext);
  useEffect(() => {
    setShowMenu(false);
  }, [wins]);

  const ctx: TaskbarContextType = {
    showMenu,
    setShowMenu,
    toggleShowMenu: () => setShowMenu((o) => !o),
  };

  return (
    <TaskbarContext.Provider value={ctx}>{children}</TaskbarContext.Provider>
  );
};
