import { useContext } from "react";
import { WinsContext } from "../../context/windows";
import { Taskbar } from "./taskbar";

import { Win } from "./window";

export const WindowManager = () => {
  const { wins } = useContext(WinsContext);

  return (
    <>
      <Taskbar />
      {[...wins.keys()].map((k) => (
        <Win key={k} winId={k} />
      ))}
    </>
  );
};
