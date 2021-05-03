import "../../styles/windowmanager/dropdownmenu.scss";

import { FC, useContext } from "react";
import { CSSTransition } from "react-transition-group";

import { SessionContext, TaskbarContext, WinsContext } from "../../contexts";

export const DropdownMenu: FC = () => {
  const { sessionLogout } = useContext(SessionContext);
  const { showMenu } = useContext(TaskbarContext);
  const { spawn } = useContext(WinsContext);

  // eslint-disable-next-line
  const FloatButton = ({ onClick, text }: any) => (
    <button type="button" onClick={onClick} className="dropdown-menu-button">
      {text}
    </button>
  );
  return (
    <CSSTransition
      in={showMenu}
      unmountOnExit
      timeout={300}
      classNames="dropdown-menu-transition"
    >
      <div className="dropdown-menu">
        <FloatButton onClick={() => spawn("term")} text="Term" />
        <FloatButton onClick={() => spawn("dummy")} text="Dummy" />
        <FloatButton onClick={sessionLogout} text="Logout" />
      </div>
    </CSSTransition>
  );
};
