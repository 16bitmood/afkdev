import "../../styles/windowmanager/window.scss";

import { FC } from "react";
import { Rnd } from "react-rnd";

import { TitleBar } from "./titlebar";
import { useWindow } from './useWindow';

export type Size = { height: number, width: number };

export type Position = { x: number,  y: number};

interface WinProps { id: number };

export interface WinState {
  id: number;
  appType: string;
  appIconPath: string;
  zIndex: number;
  app: JSX.Element;
  title: string;
  maximized: boolean;
  minimized: boolean;
  position: Position;
  size: Size;
}

export const Win: FC<WinProps> = ({ id: winId }) => {
  const {
    app,
    appType,
    appIconPath,
    minimized,
    maximized,
    position,
    title,
    size,
    zIndex,
    toggleMinimize,
    toggleMaximize,
    setSize,
    onFocus,
    setPosition,
    onExit,
  } = useWindow(winId);

  const className = "window" + (maximized ? "-maximized" : "");

  return (
    <Rnd
      enableUserSelectHack={false}
      dragHandleClassName="titlebar"
      style={{
        display: minimized ? "none" : "",
        zIndex: zIndex,
        overflowX: "hidden",
        overflowY: "hidden",
      }}
      onDrag={(e, data) => setPosition({ x: data.x, y: data.y })}
      onDragStart={onFocus}
      size={maximized? {height: '100%', width: '100%'} : size}
      position={maximized? { x: 0, y: 40} : position}
      minHeight={200}
      minWidth={300}
      className={className}
      disableDragging={maximized}
      enableResizing={!maximized}
      onResize={(_e, _direction, ref, _delta, _position) => {
        setSize({ width: ref.offsetWidth, height: ref.offsetHeight});
      }}>
      <TitleBar
        appIconPath={appIconPath}
        appType={appType}
        title={title}
        onMinimize={toggleMinimize}
        onMaximize={toggleMaximize}
        onExit={onExit}/>
      {app}
    </Rnd>
  );
};