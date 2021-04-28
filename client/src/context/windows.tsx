import { FC, useRef, useEffect, useReducer } from "react";
import { createContext, useState } from "react";

import { Win, WinState, Size, Position } from '../components/windowmanager';
import { createWebApp } from "../components/webapps";

const genId = (m: Map<number, any>): number => {
  if (m.size === 0) {
    return 0;
  }
  return Math.max(...m.keys()) + 1;
}

export interface WinsContextType {
  wins: Map<number, WinState>,
  spawn: (name: string) => void,
  kill: (id: number) => void,
  toggleMinimize: (id: number) => void,
  toggleMaximize: (id: number) => void,
  setTitle: (id: number, t: string) => void,
  setSize:(id: number, s:Size) => void,
  setPosition:(id: number, p:Position) => void,
}

export const initialWindowsContext: WinsContextType =  {
  wins: new Map(),
  spawn: () => {},
  kill: () => {},
  toggleMinimize: () => {},
  toggleMaximize: () => {},
  setTitle: () => {},
  setSize: () => {},
  setPosition: () => {},
}

export const WinsContext = createContext(initialWindowsContext);

type WindowsReducerActions = any

const initialWindowProps: Partial<WinState> = {
  position: {x: 0, y: 0},
  size: {height: 200, width: 200},
  minimized: false,
  maximized: false
}

const windowsReducer = (prevState: Map<number, WinState>, action: WindowsReducerActions): Map<number, WinState> => {
  switch(action.type) {
    case 'spawn': {
      const id = genId(prevState);
      const name = action.name;
      const app = createWebApp({id, name});
      const props = JSON.parse(JSON.stringify(initialWindowProps));
      props.app = app;
      props.id = id;
      prevState.set(id, props);
      break;
    }
    case 'kill': {
      const id = action.id;
      prevState.delete(id);
      break;
    }
    case 'toggleMinimize': {
      const id = action.id;
      const winProps = prevState.get(id)!;
      winProps.minimized = !winProps.minimized;
      prevState.set(id, winProps);
      break;
    }
    case 'toggleMaximize': {
      const id = action.id;
      const winProps = prevState.get(id)!;
      winProps.maximized = !winProps.maximized;
      prevState.set(id, winProps);
      break;
    }
    case 'setTitle': {
      const id = action.id;
      const title = action.title;
      const winProps = prevState.get(id)!;
      winProps.title = title;
      prevState.set(id, winProps);
      break;
    }
    case 'setSize': {
      const id = action.id;
      const size = action.size;
      const winProps = prevState.get(id)!;
      winProps.size = size;
      prevState.set(id, winProps);
      break;
    }
    case 'setPosition': {
      const id = action.id;
      const position = action.position;
      const winProps = prevState.get(id)!;
      winProps.position = position;
      prevState.set(id, winProps);
      break;
    }
    default: {
      console.error('Unknown action:', action);
    }
  }
  return new Map(prevState);
}

export const WinsContextProvider: FC = ( {children} ) => {

  const [wins, dispatch] = useReducer(windowsReducer, new Map<number, WinState>());

  const ctx: WinsContextType = {
    wins: wins, 
    spawn: (name) => dispatch({type: 'spawn', name}),
    kill: (id) => dispatch({type: 'kill', id}),
    toggleMinimize: (id) => dispatch({type: 'toggleMinimize', id}),
    toggleMaximize: (id) => dispatch({type: 'toggleMaximize', id}),
    setTitle: (id, title) => dispatch({type: 'setTitle', id, title}),
    setSize: (id, size) => dispatch({type: 'setSize', id, size}),
    setPosition: (id, position) => dispatch({type: 'setPosition', id, position}),
  }

  return (
    <WinsContext.Provider value={ctx}>
      {children}
    </WinsContext.Provider>
  )
}