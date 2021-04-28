import { FC, useContext } from "react";

import { WinsContext  } from '../../context/windows'

import { Rnd } from "react-rnd";

export type Size = {
  height: number,
  width: number
}

export type Position = {
  x: number,
  y: number
}

interface WinProps {
  winId: number
}

export interface WinState {
  id: number,
  app: JSX.Element,
  title: string,
  maximized: boolean,
  minimized: boolean,
  position: Position,
  size: Size,
}

interface TitleBarProps {
  title: string;
  onMinimize: () => void;
  onMaximize: () => void;
  onExit: () => void;
}

const TitleBar: FC<TitleBarProps> = ({
  title,
  onMinimize,
  onMaximize,
  onExit,
}) => {
  return (
    <>
      {title}
      <button onClick={onMinimize}> minimize </button>
      <button onClick={onMaximize}> maximize </button>
      <button onClick={onExit}> exit </button>
    </>
  );
};

export const Win: FC<WinProps> = ({winId}) => {
  const { 
    app,
    minimized,
    maximized,
    position,
    title,
    size,
    toggleMinimize, 
    toggleMaximize, 
    setSize, 
    setPosition, 
    setTitle, 
    onExit 
  } = useWindow(winId);

  return (
    <Rnd
      style={{ display: minimized ? "none" : "" }}
      position={position}
      onDrag={(e, data) => setPosition({ x: data.x, y: data.y })}
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

  const { wins, kill, toggleMaximize, toggleMinimize, setSize, setPosition, setTitle } = useContext(WinsContext);
  const winProps = wins.get(id)!;
  return {
    ...winProps,
    onExit: () => kill(id),
    toggleMaximize: () => toggleMaximize(id),
    toggleMinimize: () => toggleMinimize(id),
    setTitle: (title: string) => setTitle(id, title),
    setSize: (size: Size) => setSize(id, size),
    setPosition: (position: Position) => setPosition(id, position),
  }
}