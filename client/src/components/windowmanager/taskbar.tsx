import { FC, useContext } from "react";
import { WinsContext } from "../../context/windows";

export const Taskbar: FC = () => {
    const { wins, toggleMinimize } = useContext(WinsContext);
    return (
        <div>
            {
            [...wins.values()].map((win) => 
                <button key={win.id} onClick={() => toggleMinimize(win.id)}>
                    <h4>{win.id}</h4>
                </button>)
            }
        </div>
    );
}