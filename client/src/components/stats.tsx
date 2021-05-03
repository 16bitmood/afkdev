import "../styles/windowmanager/taskbar.scss";

import { FC, useEffect, useState } from "react";
import { getStats } from "../api";

export const Stats: FC = () => {
  const [stats, setStats] = useState({ ip: "0.0.0.0" });
  useEffect(() => {
    const i = setInterval(async () => setStats(await getStats()), 10000);
    return () => clearInterval(i);
  }, []);

  return <span className="taskbar-end-element">IP: {stats.ip}</span>;
};
