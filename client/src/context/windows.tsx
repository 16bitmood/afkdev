import { FC, useEffect } from "react";
import { createContext, useState } from "react";

import { createWebApp } from "../components/webapps";
import { Win } from "../components/windowmanager";

export interface WinsContextType {
  wins: Map<number, JSX.Element>;
  focused: number | null;
  focus: (id: number) => void;
  create: (name: string) => void;
}

export const initialWindowsContext: WinsContextType = {
  wins: new Map(),
  focused: null,
  focus: () => {},
  create: () => {},
};

let _maxId = 0;
const genId = () => {
  _maxId += 1;
  return _maxId;
};

export const WinsContext = createContext(initialWindowsContext);

export const WinsContextProvider: FC = ({ children }) => {
  const [wins, setWins] = useState(new Map() as Map<number, JSX.Element>);
  const [focused, setFocused] = useState<null | number>(null);

  const closeWin = (id: number) => {
    setFocused((prevFocused) => (prevFocused === id ? null : prevFocused));
    setWins((prevWins) => {
      prevWins.delete(id);
      return new Map(prevWins);
    });
  };

  useEffect(() => {
    console.log(wins);
  }, [wins]);

  const ctxValue: WinsContextType = {
    wins,
    focused,
    focus: (id) => setFocused(id),
    create: (name: string) => {
      setWins((prevWins) => {
        const winId = genId();
        const NewWin = (
          <Win key={winId} appName={name} onExit={() => closeWin(winId)} />
        );
        prevWins.set(winId, NewWin);
        console.log("created: ", winId);
        return new Map(prevWins);
      });
    },
  };

  return (
    <WinsContext.Provider value={ctxValue}>{children}</WinsContext.Provider>
  );
};
