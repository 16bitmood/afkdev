import { useContext } from "react";
import { WinsContext } from "../../context/windows";

export type AppContext = {
  onExit: () => void;
  onTitleChange: (t: string) => void;
};

export const useApp = (id: number): AppContext => {
  const { kill, setTitle } = useContext(WinsContext);

  return {
    onExit: () => kill(id),
    onTitleChange: (title: string) => setTitle(id, title),
  };
};
