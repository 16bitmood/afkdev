import { FC } from "react";
import { ITerminalOptions } from "xterm";

import { WebTerm } from "./webterm";
import { Dummy } from "./dummy";

export * from "./webterm";

export type WebApp = FC<WebAppProps>;

export interface WebAppProps {
  id: number;
  name: string;
  appOptions?: any;
}

const initialAppOptions = {
  term: {
    fontFamily: "Inconsolata",
    fontSize: 15,
  } as ITerminalOptions,
};

export const createWebApp = (options: WebAppProps): JSX.Element => {
  switch (options.name) {
    case "term":
      return (
        <WebTerm {...options} appOptions={initialAppOptions[options.name]} />
      );
    case "dummy":
      return <Dummy {...options} />;
    default:
      throw new Error();
  }
};
