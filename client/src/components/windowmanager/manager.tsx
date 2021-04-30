import { useContext } from "react";

import { WinsContext } from "../../context/windows";
import { Taskbar } from "./taskbar";
import { Win } from "./window";

export const WindowManager = () => {
  const { wins } = useContext(WinsContext);
  const ids = [...wins.keys()];
  return (
    <>
      <Taskbar />
      {ids.map((id) => (
        <Win key={id} id={id} />
      ))}
    </>
  );
};
