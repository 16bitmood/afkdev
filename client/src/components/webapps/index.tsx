import { FC, FormEventHandler, useState } from "react";
import { WebTerm } from "./webterm";

export * from "./webterm";

export interface WebAppProps {
  name: string;
  appOptions: any; // TODO:
  size: any; // TODO:
  onExit: () => void;
  onTitleChange: (title: string) => void;
}

export const Dummy: FC<WebAppProps> = (props) => {
  const { name, onExit, onTitleChange, appOptions } = props;

  const [input, setInput] = useState("dummy title");

  const handleSubmit: FormEventHandler = (ev) => {
    ev.preventDefault();
    onTitleChange(input);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <h1> Change Title </h1>
          <input type="text" onChange={(ev) => setInput(ev.target.value)} />
        </label>
        <button type="submit">Apply Changes</button>
      </form>
      <button onClick={onExit}>Close This App</button>
    </div>
  );
};

export const createWebApp = (options: WebAppProps): JSX.Element => {
  switch (options.name) {
    case "term":
      return <WebTerm {...options} />;
    case "dummy":
      return <Dummy {...options} />;
    default:
      throw new Error();
  }
};
