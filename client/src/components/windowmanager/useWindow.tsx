import type { Size, Position } from "./window";

import { useContext } from "react";
import { WinsContext } from "../../context/windows";

export const useWindow = (id: number) => {
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
  const winState = wins.filter(o => o.id === id)[0]!;
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
