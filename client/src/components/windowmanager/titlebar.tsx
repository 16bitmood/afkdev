import "../../styles/windowmanager/titlebar.scss";

import { FC } from "react";
import { Icon } from "@mdi/react";
import { mdiWindowMinimize, mdiRectangleOutline, mdiClose } from "@mdi/js";

interface TitleBarProps {
  appIconPath: string;
  appType: string;
  title: string;
  onMinimize: () => void;
  onMaximize: () => void;
  onExit: () => void;
}

export const TitleBar: FC<TitleBarProps> = ({
  appIconPath,
  appType,
  title,
  onMinimize,
  onMaximize,
  onExit,
}) => (
    <div className="titlebar">
      <div className="titlebar-left">
        <Icon
          size="16px"
          path={appIconPath}
          style={{ verticalAlign: "middle" }}
        />
        <span style={{ padding: 10 }}>{appType}</span>
      </div>
      <div className="titlebar-center">{title}</div>
      <div className="titlebar-right">
        <button type='button' onClick={onMinimize} className="titlebar-right-button">
          <Icon size="16px" path={mdiWindowMinimize} />
        </button>
        <button type='button' onClick={onMaximize} className="titlebar-right-button">
          <Icon size="16px" path={mdiRectangleOutline} />
        </button>
        <button type='button' onClick={onExit} className="titlebar-right-button-close">
          <Icon size="16px" path={mdiClose} />
        </button>
      </div>
    </div>
  );
