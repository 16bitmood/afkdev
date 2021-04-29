import "../../styles/windowmanager/taskbar.scss";

import { FC, useContext, useEffect, useState } from "react";

import { Icon } from "@mdi/react";
import { mdiCube, mdiCubeOutline } from '@mdi/js';

import { WinsContext } from "../../context/windows";
import { SessionContext } from "../../context/session";

const Menu: FC = () => {
  const { sessionLogout } = useContext(SessionContext);
  const { spawn } = useContext(WinsContext);
  const FloatButton = ({onClick, text}: any) => {
    return (
      <button onClick={onClick} className='taskbar-float-menu-button'>
        {text}  
      </button>
    )
  }

  return (
    <div className='taskbar-float-menu'>
      <FloatButton onClick={() => spawn('term')} text='Term'/>
      <FloatButton onClick={() => spawn('dummy')} text='Dummy'/>
      <FloatButton onClick={sessionLogout} text='Logout'/>
    </div>
  );
}

const MenuButton: FC = () => {
  const {wins} = useContext(WinsContext);
  const [menuOpened, setMenuOpened] = useState(false);
  const onClick = () => {
    setMenuOpened(menuOpened => !menuOpened);
  }
  useEffect(() => {setMenuOpened(false)},[wins]);
  const className = `taskbar-menu-button-${menuOpened? 'opened':'closed'}`;

  return (
    <>
    <button onClick= {onClick} className={className}>
      <Icon size='30px'  path={mdiCubeOutline}/>
    </button>
    {menuOpened? <Menu /> : <></> } 
    </>
  );
}


export const Taskbar: FC = () => {
  const { wins, toggleMinimize, focused } = useContext(WinsContext);
  return (
    <div className="taskbar">
      <MenuButton />
      {[...wins.values()].map((win) => 
        (<button
          className={win.id === focused? 'taskbar-app-focused' : 'taskbar-app'}
          key={win.id}
          onClick={() => toggleMinimize(win.id)}
        >
         <Icon size='24px' path={win.appIconPath}/>
          <div>{win.appType}</div>
        </button>)
      )}
    </div>
  );
};