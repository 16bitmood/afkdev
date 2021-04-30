import ReactDom from "react-dom";
import App from "./app";
import { Metadata } from "./metadata";

ReactDom.render(
  <App>
    <Metadata />
  </App>,
  document.getElementById("root")
);
