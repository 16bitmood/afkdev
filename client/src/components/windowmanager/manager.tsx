import { useContext } from "react";
import { WinsContext } from "../../context/windows";
import { Taskbar } from './taskbar';

import { Win } from './window';

export const WindowManager = () => {
  const { wins , spawn } = useContext(WinsContext);
  
  return (
    <>
      <Taskbar />
      {[...wins.keys()].map((k) => <Win key={k} winId={k} />)}
      <button onClick={() => spawn("dummy")}>create dummy</button>
      <button onClick={() => spawn("term")}>create term</button>
    </>
  );
};
