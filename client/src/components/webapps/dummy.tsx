import "../../styles/webapps/dummy.scss";

import { FC, useState, FormEventHandler } from "react";

import { useApp } from "./useApp";
import { WebAppOptions } from "./index";

export const Dummy: FC<WebAppOptions> = (props) => {
  const { id } = props;
  const { onExit, onTitleChange } = useApp(id);

  const [input, setInput] = useState("dummy title");

  const handleSubmit: FormEventHandler = (ev) => {
    ev.preventDefault();
    onTitleChange(input);
  };

  return (
    <div className="dummy">
      <form onSubmit={handleSubmit}>
        <label>
          <h1> Change Title </h1>
          <input type="text" onChange={(ev) => setInput(ev.target.value)} />
        </label>
        <button type="submit">Apply Changes</button>
      </form>
      <button onClick={onExit}>Close App</button>
    </div>
  );
};
