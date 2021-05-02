import type { ITerminalOptions, ITheme } from "xterm";

import { WebTerm } from "./webterm";
import { Dummy } from "./dummy";

export const termScheme: ITheme = {
  background: "#1c2023",
  foreground: "#c7ccd1",
  cursor: "#c7ae95",
  black: "#1c2023",
  red: "#c7ae95",
  yellow: "#95c7ae",
  green: "#aec795",
  blue: "#ae95c7",
  magenta: "#c795ae",
  cyan: "#95aec7",
  white: "#c7ccd1",
  brightBlack: "#747c84",
  brightRed: "#c7ae95",
  brightYellow: "#95c7ae",
  brightGreen: "#aec795",
  brightBlue: "#ae95c7",
  brightMagenta: "#c795ae",
  brightCyan: "#95aec7",
  brightWhite: "#f3f4f5",
};

export type WebAppOptions = {
  id: number;
  name: "term" | "dummy";
  appOptions?: ITerminalOptions | null;
};

const initialAppOptions = {
  term: {
    fontFamily: "Inconsolata",
    fontSize: 16,
    theme: termScheme,
  } as ITerminalOptions,
  dummy: null,
};

export const createWebApp = (options: WebAppOptions): JSX.Element => {
  if (!options.appOptions || options.appOptions === {}) {
    // eslint-disable-next-line no-param-reassign
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
