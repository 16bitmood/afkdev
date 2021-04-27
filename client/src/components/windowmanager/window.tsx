import { FC, useState, useContext, useRef } from "react";
import { WinsContext } from "../../context/windows";

import { Rnd } from "react-rnd";
import { createWebApp } from "../webapps";

interface WinProps {
  appName: string;
  key: number;
  onExit: () => void;
}

interface TitleBarProps {
  title: string;
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
}

const TitleBar: FC<TitleBarProps> = ({
  title,
  onMinimize,
  onMaximize,
  onClose,
}) => {
  return (
    <>
      {title}
      <button onClick={onMinimize}> minimize </button>
      <button onClick={onMaximize}> maximize </button>
      <button onClick={onClose}> close </button>
    </>
  );
};

export const Win: FC<WinProps> = ({ appName, key, onExit }) => {
  console.log(key);
  const [title, setTitle] = useState(` WindowId: ${key} `);
  const [maximized, setMaximized] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ height: 300, width: 600 });

  const app = createWebApp({
    name: appName,
    appOptions: {},
    size,
    onExit,
    onTitleChange: (title: string) => {
      setTitle(title);
    },
  });

  return (
    <Rnd
      style={{ display: minimized ? "none" : "" }}
      position={pos}
      onDrag={(e, data) => setPos({ x: data.x, y: data.y })}
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
        onMinimize={() => setMinimized(!minimized)}
        onMaximize={() => setMaximized(!maximized)}
        onClose={onExit}
      />
      {app}
    </Rnd>
  );
};
