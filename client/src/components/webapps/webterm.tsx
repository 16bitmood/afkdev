import React, { MutableRefObject, useEffect, useRef } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { WebLinksAddon } from "xterm-addon-web-links";
import { WebglAddon } from "xterm-addon-webgl";

import { createApp, connectWS } from "../../api";

import { isWebGL2Available } from "../../utils";

import { WebAppProps } from "./index";

// fix
import "xterm/css/xterm.css";

enum CMD {
  CLIENT_DATA = "0",
  CLIENT_UPDATE = "1",
  SERVER_DATA = "0",
}

export const WebTerm: React.FC<WebAppProps> = (props) => {
  // Refs will remain the same on re-renders
  const termAddonsRef = useRef({
    fit: new FitAddon(),
    webLinks: new WebLinksAddon(),
    webgl: isWebGL2Available() ? new WebglAddon() : null,
  });
  const termRef = useRef(new Terminal(props.appOptions));
  const termContainerRef: MutableRefObject<HTMLDivElement | null> = useRef(
    null
  );
  const wsRef: MutableRefObject<WebSocket | null> = useRef(null);
  const pidRef: MutableRefObject<number | null> = useRef(null);

  const initializeTerm = () => {
    const { fit, webLinks, webgl } = termAddonsRef.current;
    const term = termRef.current;
    term.loadAddon(fit);
    term.loadAddon(webLinks);
    term.onTitleChange(() =>
      props.onTitleChange ? props.onTitleChange : () => {}
    );
    term.onData(onTermData);
    term.onResize(onTermResize);

    if (
      document.queryCommandSupported &&
      document.queryCommandSupported("copy")
    ) {
      term.onSelectionChange(() => {
        if (term.getSelection() === "") return;
        document.execCommand("copy");
      });
    }

    if (termContainerRef.current) {
      term.open(termContainerRef.current);
      if (webgl) {
        term.loadAddon(webgl);
      }
    } else {
      console.error("term ref is undefined");
    }
  };

  const onTermResize = async (size: { cols: number; rows: number }) => {
    const socket = wsRef.current;
    if (!socket) {
      return;
    } else if (socket.readyState === WebSocket.OPEN) {
      socket.send(
        CMD.CLIENT_UPDATE +
          JSON.stringify({
            option: "resize",
            cols: size.cols,
            rows: size.rows,
          })
      );
    }
  };

  const onTermData = async (data: string) => {
    const socket = wsRef.current;
    if (!socket) {
      return;
    } else if (socket.readyState === WebSocket.OPEN) {
      socket.send(CMD.CLIENT_DATA + data);
    }
  }

  const onSocketOpen = async () => {
    await onTermResize(termAddonsRef.current.fit.proposeDimensions());
  };

  const onSocketMessage = (ev: MessageEvent) => {
    const cmd = ev.data[0] as CMD;
    const data = ev.data.slice(1);
    switch (cmd) {
      case CMD.SERVER_DATA:
        termRef.current.write(data);
        break;
      default:
        console.error("Invalid Command!");
    }
  };

  const onExit = () => {
    if (wsRef.current) {
      wsRef.current.close();
      termRef.current.dispose();
      props.onExit();
    }
  };

  const connectWebTerm = async () => {
    pidRef.current = await createApp("term");
    wsRef.current = connectWS(pidRef.current);
    wsRef.current.onopen = onSocketOpen;
    wsRef.current.onmessage = onSocketMessage;
    wsRef.current.onerror = onExit;
    wsRef.current.onclose = onExit;
  };

  useEffect(() => {
    initializeTerm();
    connectWebTerm();
    return onExit;
  }, []);

  useEffect(() => {
    termAddonsRef.current.fit.fit();
  }, [props.size]);

  return <div ref={termContainerRef} />;
};
