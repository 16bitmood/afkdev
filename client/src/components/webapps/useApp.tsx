import { useContext } from "react";
import { WinsContext } from "../../context/windows";

export const useApp = (id: number) => {
  const { kill, setTitle } = useContext(WinsContext);

  return {
    onExit: () => kill(id),
    onTitleChange: (title: string) => setTitle(id, title),
  };
};
