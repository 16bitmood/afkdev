import { FC, useContext } from "react";

import { WinsContext } from "../../context/windows";
import { TaskbarContextProvider } from "../../context/taskbar";
import { Taskbar } from "./taskbar";
import { Win } from "./window";
import { DropdownMenu } from "./dropdownmenu";

export const WindowManager: FC = () => {
  const { wins } = useContext(WinsContext);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "url(background.jpg) no-repeat center center",
        backgroundSize: "cover",
      }}
    >
      <TaskbarContextProvider>
        <Taskbar />
        <DropdownMenu />
      </TaskbarContextProvider>
      {wins
        .map((o) => o.id)
        .map((id) => (
          <Win key={id} id={id} />
        ))}
    </div>
  );
};
