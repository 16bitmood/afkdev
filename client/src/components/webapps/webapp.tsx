import { ITerminalOptions } from "xterm";

import { WebTerm } from "./webterm";
import { Dummy } from "./dummy";

import { colors } from '../../styles/colors.json';

export interface WebAppOptions {
  id: number;
  name: "term" | "dummy";
  appOptions?: any;
}

const initialAppOptions = {
  term: {
    fontFamily: "Inconsolata",
    fontSize: 15,
    theme: colors,
  } as ITerminalOptions,
  dummy: {},
};

export const createWebApp = (options: WebAppOptions): JSX.Element => {
  if (options.appOptions === {}) {
    options.appOptions = initialAppOptions[options.name];
  }

  switch (options.name) {
    case "term":
      return <WebTerm {...options} />;
    case "dummy":
      return <Dummy {...options} />;
    default:
      throw new Error();
  }
};
