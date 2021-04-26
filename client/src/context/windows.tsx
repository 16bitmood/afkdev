import type { FC } from "react";
import { createContext, useState } from "react";

import { createWebApp } from "../components/webapps";
import { Win } from "../components/windowmanager";

// type Win = any; // TODO
// type WinId = number;

export interface WinsContextType {
  wins: Map<number, JSX.Element>;
  focused: number | null;
  maxId: number;
  focus: (id: number) => void;
  create: (appName: string) => void;
  close: (id: number) => void;
}

export const initialWindowsContext: WinsContextType = {
  wins: new Map(),
  focused: null,
  maxId: 0,
  focus: () => {},
  create: () => {},
  close: () => {},
};

export const WinsContext = createContext(initialWindowsContext);

export const WinsContextProvider: FC = ({ children }) => {
  const [wins, setWins] = useState(new Map() as Map<number, JSX.Element>);
  const [maxId, setMaxId] = useState(0);
  const [focused, setFocused] = useState<null | number>(null);

  const genId = () => {
    setMaxId(maxId + 1);
    return maxId - 1;
  };

  const ctxValue: WinsContextType = {
    wins: wins,
    focused: null,
    maxId: maxId,
    focus: (id) => setFocused(id),
    create: (name: string) => {
      const winId = genId();
      const App = createWebApp({
        name,
        size: {},
        onExit: () => {},
        appOptions: {},
        onTitleChange: (t) => {},
      });
      const NewWin = <Win id={winId} WebApp={App} />;
      wins.set(winId, NewWin);
      setWins(new Map(wins));
    },
    close: (id) => {
      if (focused === id) {
        setFocused(null);
      }
      wins.delete(id);
      setWins(new Map(wins));
    },
  };

  return (
    <WinsContext.Provider value={ctxValue}>{children}</WinsContext.Provider>
  );
};
