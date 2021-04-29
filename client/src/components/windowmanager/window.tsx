import { FC, useContext } from "react";

import { WinsContext } from "../../context/windows";

import { Rnd } from "react-rnd";
import { TitleBar } from "./titlebar";

export type Size = {
  height: number;
  width: number;
};

export type Position = {
  x: number;
  y: number;
};

interface WinProps {
  winId: number;
}

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

export const Win: FC<WinProps> = ({ winId }) => {
  const {
    app,
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
    setTitle,
    onExit,
  } = useWindow(winId);

  return (
    <Rnd
      style={{ display: minimized ? "none" : "", zIndex: zIndex }}
      position={position}
      onDrag={(e, data) => setPosition({ x: data.x, y: data.y })}
      onDragStart={onFocus}
      size={size}
      onResize={(e, direction, ref, delta, position) => {
        setSize({
          width: ref.offsetWidth,
          height: ref.offsetHeight,
        });
      }}
    >
      <TitleBar
        title={title}
        onMinimize={toggleMinimize}
        onMaximize={toggleMaximize}
        onExit={onExit}
      />
      {app}
    </Rnd>
  );
};

const useWindow = (id: number) => {
  const {
    wins,
    kill,
    focus,
    toggleMaximize,
    toggleMinimize,
    setSize,
    setPosition,
    setTitle,
  } = useContext(WinsContext);
  const winProps = wins.get(id)!;
  return {
    ...winProps,
    onFocus: () => focus(id),
    onExit: () => kill(id),
    toggleMaximize: () => toggleMaximize(id),
    toggleMinimize: () => toggleMinimize(id),
    setTitle: (title: string) => setTitle(id, title),
    setSize: (size: Size) => setSize(id, size),
    setPosition: (position: Position) => setPosition(id, position),
  };
};
