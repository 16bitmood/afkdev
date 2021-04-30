import "../styles/windowmanager/taskbar.scss";

import { FC, useEffect, useState } from "react";

export const Clock: FC = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  useEffect(() => {
    setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
  }, []);
  return <span className="taskbar-element">{time}</span>;
};
