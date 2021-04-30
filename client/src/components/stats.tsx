import '../styles/windowmanager/taskbar.scss';

import { FC, useEffect, useState } from "react";
import { getStats } from "../api";

export const Stats: FC = () => {
  const [stats, setStats] = useState({ ip: "0.0.0.0" });
  useEffect(() => {
    setInterval(async () => setStats(await getStats()), 5000);
  }, []);

  return <span className="taskbar-element">IP: {stats.ip}</span>;
};
