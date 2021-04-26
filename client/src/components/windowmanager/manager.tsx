import { useContext } from "react";
import { WinsContext } from "../../context/windows";

export const WindowManager = () => {
  const { wins, create } = useContext(WinsContext);
  return (
    <>
      {wins.values()}
      <button onClick={() => create("dummy")}>create dummy</button>
      <button onClick={() => create("term")}>create term</button>
    </>
  );
};
