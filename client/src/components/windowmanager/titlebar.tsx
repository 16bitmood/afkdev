import '../../styles/windowmanager/titlebar.scss';

import { FC } from "react";
import { Icon } from '@mdi/react';
import { mdiWindowMinimize, mdiRectangleOutline, mdiClose } from '@mdi/js';

interface TitleBarProps {
  title: string;
  onMinimize: () => void;
  onMaximize: () => void;
  onExit: () => void;
}

export const TitleBar: FC<TitleBarProps> = ({
  title,
  onMinimize,
  onMaximize,
  onExit,
}) => {
  return (
    <div className='titlebar'>
      <div className='titlebar-center'>
        {title}
      </div>
      <div className='titlebar-right'>
        <button onClick={onMinimize} className='titlebar-right-button'>
          <Icon size='16px' path={mdiWindowMinimize}/>
         </button>
        <button onClick={onMaximize} className='titlebar-right-button'>
          <Icon size='16px' path={mdiRectangleOutline}/>
        </button>
        <button onClick={onExit} className='titlebar-right-button-close'>
          <Icon size='16px' path={mdiClose}/>
        </button>
      </div>
    </div>
  );
};