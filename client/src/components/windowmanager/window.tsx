import { FC, useState, useContext, useRef } from "react";
import { WinsContext } from "../../context/windows";

import { Rnd } from 'react-rnd';
import { createWebApp } from "../webapps";

interface WinProps {
  appName: string,
  id: number,
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

export const Win: FC<WinProps> = ({appName, id}) => {
  const { close } = useContext(WinsContext);
  const onExit = () => close(id);

  const [title, setTitle] = useState(" title ");
  const [maximized, setMaximized] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [pos, setPos] = useState({x: 0, y: 0});
  const [size, setSize] = useState({height: 300, width: 300});

  const app = (
    createWebApp({
      name: appName,
      appOptions: {},
      size,
      onExit,
      onTitleChange : (title) => {setTitle(title)}
  }));

  return (
    <Rnd 
      onDrag={(e,data) => setPos({x: data.x, y: data.y})}
      onResize = {(e, direction, ref, delta, position) => {
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
