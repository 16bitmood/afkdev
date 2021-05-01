import { useContext } from "react";

import { WinsContext } from "../../context/windows";
import { Taskbar } from "./taskbar";
import { Win } from "./window";

export const WindowManager = () => {
  const { wins } = useContext(WinsContext);
  const ids = [...wins.keys()];
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "url(background.jpg) no-repeat center center",
        backgroundSize: "cover",
      }}
    >
      <Taskbar />
      {ids.map((id) => (
        <Win key={id} id={id} />
      ))}
    </div>
  );
};
