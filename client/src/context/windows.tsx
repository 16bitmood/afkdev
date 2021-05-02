import { FC, useReducer , createContext, useState } from "react";


import { mdiCircle, mdiConsole } from "@mdi/js";
import { WinState, Size, Position } from "../components/windowmanager";
import { createWebApp } from "../components/webapps";

// Helpers
const genId = (l: {id: number}[]): number => {
  if (l.length === 0) {
    return 0;
  }
  return Math.max(...l.map(o => o.id)) + 1;
};

const getAppIconPath = (name: string): string => {
  switch (name) {
    case "term":
      return mdiConsole;
    case "dummy":
      return mdiCircle;
    default:
      throw new Error("icon not found");
  }
};

// Types
export interface WinsContextType {
  wins: WinState[],
  // wins: Map<number, WinState>; // TODO: Should I just use an object?
  focused: number;
  spawn: (name: "term" | "dummy") => void; // TODO:
  kill: (id: number) => void;
  focus: (id: number) => void;
  toggleMinimize: (id: number) => void;
  toggleMaximize: (id: number) => void;
  setTitle: (id: number, t: string) => void;
  setSize: (id: number, s: Size) => void;
  setPosition: (id: number, p: Position) => void;
  setNeedResize: (id: number, b: boolean) => void;
}

// TODO: Refactor into sum type
type WindowsReducerActions = {
  type:
    | "spawn"
    | "kill"
    | "focus"
    | "toggleMinimize"
    | "toggleMaximize"
    | "setSize"
    | "setNeedResize"
    | "setPosition"
    | "setTitle";
  id?: number;
  needResize?: boolean;
  name?: "term" | "dummy"; // TODO:
  size?: Size;
  position?: Position;
  title?: string;
};

export const initialWindowsContext: WinsContextType = {
  wins: [],
  focused: -1,
  spawn: () => {},
  kill: () => {},
  focus: () => {},
  toggleMinimize: () => {},
  toggleMaximize: () => {},
  setTitle: () => {},
  setSize: () => {},
  setNeedResize: () => {},
  setPosition: () => {},
};

export const WinsContext = createContext(initialWindowsContext);

const initialWindowProps: Partial<WinState> = {
  position: { x: 0, y: 0 },
  size: { height: 400, width: 600 },
  needResize: true,
  minimized: false,
  maximized: false,
};

const windowsReducer = (
  prevState: WinState[],
  action: WindowsReducerActions
): WinState[] => {
  const { id, type } = action;
  const winState: WinState = prevState.filter(o => o.id === id)[0];
  switch (type) {
    case "spawn": {
      const newId = genId(prevState);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const name = action.name!;
      const app = createWebApp({ id: newId, name });
      const newState = JSON.parse(JSON.stringify(initialWindowProps)) as WinState;
      newState.app = app;
      newState.id = newId;
      newState.appType = name;
      newState.appIconPath = getAppIconPath(name);
      return prevState.concat(newState);
    }
    case "kill": {
      return prevState.filter(o => o.id !== id);
    }
    case "focus": {
      /* eslint-disable */
      return prevState.filter((s) => {
        if (s.id !== id) {
          s.zIndex = s.id;
        } else {
          s.zIndex = 999;
        }
        return s
      });
      /* eslint-enable */
    }
    case "toggleMinimize": {
      winState.minimized = !winState.minimized;
      return prevState.filter(s => s.id === id? winState : s);
    }
    case "toggleMaximize": {
      winState.maximized = !winState.maximized;
      winState.needResize = true;
      return prevState.filter(s => s.id === id? winState : s);
    }
    case "setTitle": {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const title = action.title!;
      winState.title = title;
      return prevState.filter(s => s.id === id? winState : s);
    }
    case "setSize": {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const size = action.size!;
      winState.size = size;
      return prevState.filter(s => s.id === id? winState : s);
    }
    case "setNeedResize": {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      winState.needResize = action.needResize!;
      return prevState.filter(s => s.id === id? winState : s);
    }
    case "setPosition": {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const position = action.position!;
      winState.position = position;
      return prevState.filter(s => s.id === id? winState : s);
    }
    default: {
      throw new Error(`Unknown action: ${action}`);
    }
  }
};

export const WinsContextProvider: FC = ({ children }) => {
  const [wins, dispatch] = useReducer(
    windowsReducer,
    [] as WinState[]
  );

  const [focused, setFocused] = useState(-1);

  const ctx: WinsContextType = {
    wins,
    focused,
    spawn: (name) => dispatch({ type: "spawn", name }),
    kill: (id) => dispatch({ type: "kill", id }),
    focus: (id) => {
      setFocused(id);
      dispatch({ type: "focus", id });
    },
    toggleMinimize: (id) => {
      setFocused(id);
      dispatch({ type: "toggleMinimize", id });
    },
    toggleMaximize: (id) => {
      setFocused(id);
      dispatch({ type: "toggleMaximize", id });
    },
    setTitle: (id, title) => dispatch({ type: "setTitle", id, title }),
    setSize: (id, size) => dispatch({ type: "setSize", id, size }),
    setNeedResize: (id, needResize) =>
      dispatch({ type: "setNeedResize", id, needResize }),
    setPosition: (id, position) =>
      dispatch({ type: "setPosition", id, position }),
  };

  return <WinsContext.Provider value={ctx}>{children}</WinsContext.Provider>;
};
