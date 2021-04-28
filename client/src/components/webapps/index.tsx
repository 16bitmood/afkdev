import { FC } from "react";
import { WebTerm } from "./webterm";
import { Dummy } from './dummy';

export * from "./webterm";

export type WebApp = FC<WebAppProps>;

export interface WebAppProps {
  id: number;
  name: string;
  appOptions?: any;
}

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

