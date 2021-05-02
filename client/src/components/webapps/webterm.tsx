import "xterm/css/xterm.css";
import "../../styles/webapps/webterm.scss";

import React, { MutableRefObject, useEffect, useRef } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { WebLinksAddon } from "xterm-addon-web-links";
import { WebglAddon } from "xterm-addon-webgl";

import { createApp, connectWS } from "../../api";
import { isWebGL2Available } from "../../utils";
import { WebAppOptions } from "./index";
import { useWindow } from "../windowmanager";

enum CMD {
  CLIENT_DATA = "0",
  CLIENT_UPDATE = "1",
  SERVER_DATA = "0",
}

export const WebTerm: React.FC<WebAppOptions> = (props) => {
  const { needResize, setNeedResize, onExit } = useWindow(props.id);

  // Refs will remain the same on re-renders
  const termAddonsRef = useRef({
    fit: new FitAddon(),
    webLinks: new WebLinksAddon(),
    webgl: false && isWebGL2Available() ? new WebglAddon() : null, // TODO: Add an options app;
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
    term.onTitleChange((title) => console.log("term title changed")); // TODO
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
  };

  const onSocketOpen = async () => {
    const {rows, cols} = termAddonsRef.current.fit.proposeDimensions();
    await onTermResize({rows, cols:cols-1});
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

  const onClose = () => {
    if (wsRef.current) {
      wsRef.current.close();
      termRef.current.dispose();
      onExit();
    }
  };

  const connectWebTerm = async () => {
    pidRef.current = await createApp("term");
    wsRef.current = connectWS(pidRef.current!);
    wsRef.current.onopen = onSocketOpen;
    wsRef.current.onmessage = onSocketMessage;
    wsRef.current.onerror = onClose;
    wsRef.current.onclose = onClose;
  };

  useEffect(() => {
    initializeTerm();
    connectWebTerm();
    return onClose;
  }, []);

  useEffect(() => {
    if (needResize) {
      const {rows, cols} = termAddonsRef.current.fit.proposeDimensions();
      // TODO: temp fix, fitaddon is not correctly calculating rows, maybe
      // becuase it's not correctly identifying parent element
      termRef.current.resize(cols, rows-1);
      setNeedResize(false);
    }
  }, [needResize]);

  return (
    <div style={{ height: "100%", width: "100%", boxSizing: 'border-box'}} ref={termContainerRef} />
  );
};
