import "../../styles/windowmanager/taskbar.scss";

import { FC, useContext } from "react";
import { Icon } from "@mdi/react";
import { mdiCubeOutline } from "@mdi/js";

import { Clock } from "../clock";
import { Stats } from "../stats";
import { WinsContext } from "../../context/windows";
import { TaskbarContext } from "../../context/taskbar";

const MenuButton: FC = () => {
  const { showMenu, toggleShowMenu } = useContext(TaskbarContext);
  return (
    <button
      type="button"
      onClick={toggleShowMenu}
      className={
        showMenu ? "taskbar-menu-button-active" : "taskbar-menu-button"
      }
    >
      <Icon size="30px" path={mdiCubeOutline} />
    </button>
  );
};

const WindowIcons: FC = () => {
  const { wins, toggleMinimize, focused } = useContext(WinsContext);
  return (
    <>
      {wins.map((win) => (
        <button
          type="button"
          className={win.id === focused ? "taskbar-app-focused" : "taskbar-app"}
          key={win.id}
          onClick={() => toggleMinimize(win.id)}
        >
          <Icon size="24px" path={win.appIconPath} />
        </button>
      ))}
    </>
  );
};

export const Taskbar: FC = () => (
  <div className="taskbar">
    <MenuButton />
    <WindowIcons />
    <div className="taskbar-end">
      <Stats />
      <Clock />
    </div>
  </div>
);
