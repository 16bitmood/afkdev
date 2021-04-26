import { FC, useState, useContext } from "react";
import { WinsContext } from "../../context/windows";

import { Rnd } from 'react-rnd';

interface WinProps {
  WebApp: JSX.Element;
  id: number;
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

export const Win: FC<WinProps> = ({ WebApp, id}) => {
  const { close } = useContext(WinsContext);
  const onExit = () => close(id);

  const [title] = useState(" title ");
  const [maximized, setMaximized] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [pos, setPos] = useState({x: 0, y: 0});
  const [size, setSize] = useState({height: 300, width: 300});

  return (
    <Rnd 
      onDrag={(e,data) => setPos({x: data.x, y: data.y})}
      onResize = {(e, direction, ref, delta, position) => {
        setSize({
          width: ref.offsetWidth,
          height: ref.offsetHeight,
          ...position,
        });
        //  this.termRef.current.fitAddon.fit()
    }}
    >
      <TitleBar
        title={title}
        onMinimize={() => setMinimized(!minimized)}
        onMaximize={() => setMaximized(!maximized)}
        onClose={onExit}
      />
      {WebApp}
    </Rnd>
  );
};
