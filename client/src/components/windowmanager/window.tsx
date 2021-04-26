import { FC, useState, useContext } from "react";
import { WinsContext } from "../../context/windows";

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

export const Win: FC<WinProps> = ({ WebApp, id }) => {
  const { close } = useContext(WinsContext);
  const onExit = () => close(id);

  const [title] = useState(" title ");
  const [maximized, setMaximized] = useState(false);
  const [minimized, setMinimized] = useState(false);

  return (
    <>
      <TitleBar
        title={title}
        onMinimize={() => setMinimized(!minimized)}
        onMaximize={() => setMaximized(!maximized)}
        onClose={onExit}
      />
      {WebApp}
    </>
  );
};
