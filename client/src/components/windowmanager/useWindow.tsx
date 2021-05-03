import { useContext } from "react";
import type { Size, Position } from "./window";

import { WinsContext } from "../../contexts";

// eslint-disable-next-line
export const useWindow = (id: number): any => {
  const {
    wins,
    kill,
    focus,
    toggleMaximize,
    toggleMinimize,
    setSize,
    setNeedResize,
    setPosition,
    setTitle,
  } = useContext(WinsContext);
  const [winState] = wins.filter((o) => o.id === id);
  return {
    ...winState,
    onFocus: () => focus(id),
    onExit: () => kill(id),
    toggleMaximize: () => toggleMaximize(id),
    toggleMinimize: () => toggleMinimize(id),
    setTitle: (title: string) => setTitle(id, title),
    setSize: (size: Size) => setSize(id, size),
    setPosition: (position: Position) => setPosition(id, position),
    setNeedResize: (b: boolean) => setNeedResize(id, b),
  };
};
