import { FC, useReducer } from "react";
import { createContext, useState } from "react";

import { WinState, Size, Position } from "../components/windowmanager";
import { createWebApp } from "../components/webapps";
import { mdiCircle, mdiConsole } from "@mdi/js";

// Helpers
const genId = (m: Map<number, any>): number => {
  if (m.size === 0) {
    return 0;
  }
  return Math.max(...m.keys()) + 1;
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
  wins: Map<number, WinState>; // TODO: Should I just use an object?
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
  wins: new Map(),
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
  needResize: false,
  minimized: false,
  maximized: false,
};

const windowsReducer = (
  prevState: Map<number, WinState>,
  action: WindowsReducerActions
): Map<number, WinState> => {
  const { id, type } = action;
  switch (type) {
    case "spawn": {
      const id = genId(prevState);
      const name = action.name!;
      const app = createWebApp({ id, name });
      const props = JSON.parse(JSON.stringify(initialWindowProps)) as WinState;
      props.app = app;
      props.id = id;
      props.appType = name;
      props.appIconPath = getAppIconPath(name);
      prevState.set(id, props);
      break;
    }
    case "kill": {
      prevState.delete(id!);
      break;
    }
    case "focus": {
      const winState = prevState.get(id!)!;
      winState.zIndex = 999;
      // hacky way
      prevState = new Map(
        [...prevState.values()].map((winState) => {
          if (winState.id !== id) {
            winState.zIndex = winState.id;
          }
          return [winState.id, winState];
        })
      );
      break;
    }
    case "toggleMinimize": {
      const winProps = prevState.get(id!)!;
      winProps.minimized = !winProps.minimized;
      prevState.set(id!, winProps);
      break;
    }
    case "toggleMaximize": {
      const winProps = prevState.get(id!)!;
      winProps.maximized = !winProps.maximized;
      prevState.set(id!, winProps);
      break;
    }
    case "setTitle": {
      const id = action.id;
      const title = action.title!;
      const winProps = prevState.get(id!)!;
      winProps.title = title;
      prevState.set(id!, winProps);
      break;
    }
    case "setSize": {
      const id = action.id;
      const size = action.size!;
      const winProps = prevState.get(id!)!;
      winProps.size = size;
      prevState.set(id!, winProps);
      break;
    }
    case "setNeedResize": {
      const id = action.id;
      const winProps = prevState.get(id!)!;
      winProps.needResize = action.needResize!;
      prevState.set(id!, winProps);
      break;
    }
    case "setPosition": {
      const id = action.id;
      const position = action.position!;
      const winProps = prevState.get(id!)!;
      winProps.position = position;
      prevState.set(id!, winProps);
      break;
    }
    default: {
      console.error("Unknown action:", action);
    }
  }
  return new Map(prevState);
};

export const WinsContextProvider: FC = ({ children }) => {
  const [wins, dispatch] = useReducer(
    windowsReducer,
    new Map<number, WinState>()
  );

  const [focused, setFocused] = useState(-1);

  const ctx: WinsContextType = {
    wins: wins,
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
