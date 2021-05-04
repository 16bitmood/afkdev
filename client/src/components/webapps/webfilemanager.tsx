import '../../styles/webapps/filemanager.scss';

import { FC, useEffect, useState, useRef, KeyboardEventHandler } from "react";
import path from 'path';
import { Icon } from '@mdi/react';
import { mdiMagnify, mdiSearchWeb } from '@mdi/js';

import { WebAppOptions } from './index'
import { connectWS, createApp } from "../../api";
import { getFileIconPath } from '../../utils';

export const WebFileManager: FC<WebAppOptions> = () => {
  const [files, setFiles] = useState([] as [string, string | null][]);
  const [currentPath, setCurrentPath] = useState("/home/gts");
  const [searchText, setSearchText] = useState("");
  const [currentPathInput, setCurrentPathInput] = useState(currentPath);
  const wsRef = useRef(null as null | WebSocket);

  const onError = (e: string) => {
    console.log(e);
  };

  const searchFile = () => {
    if (wsRef.current) {
      wsRef.current.send(JSON.stringify({option: "search", text: searchText, path: currentPath}))
    }
  }


  const getFiles = () => {
    if (wsRef.current) {
      wsRef.current.send(JSON.stringify({ option: "get", path: currentPath }));
    }
  }



  const onSocketMessage = (ev: MessageEvent) => {
    const data = JSON.parse(ev.data);
    if (data.error) {
      onError(data.error);
    } else if (Array.isArray(data.result)) {
      const s = data.result;
      s.sort(([name,_t] : [string, string | null]) => name);
      const dirs = s.filter(([_n,type] : [string, string | null]) => type === null);
      const filess = s.filter(([_n,type] : [string, string | null]) => type !== null);
      setFiles(dirs.concat(filess));
    } else {
      getFiles(); // refresh files
    }
  };

  const connectWebFileManager = async () => {
    const id = await createApp("filemanager");
    console.log(id);
    if (id !== null) {
      wsRef.current = connectWS(id);
      wsRef.current.onopen = getFiles;
      wsRef.current.onmessage = onSocketMessage;
      getFiles();
    }
  };

  useEffect(() => {
    connectWebFileManager();
  }, []);

  useEffect(() => {
    getFiles();
    setCurrentPathInput(currentPath);
  }, [currentPath]);

  return (
    <div className="filemanager">
      <div className="filemanager-search">
        <input
          type="text"
          className="first-item"
          value={searchText}
          onChange={(ev) => setSearchText(ev.target.value)}
        />
        <button type="button" className="last-item" onClick={() => searchFile()}>
          <Icon style={{height:"100%", width: "100%", padding: "2px", boxSizing: "border-box"}} path={mdiMagnify}/>
        </button>

      </div>
      <div className="filemanager-toolbar">
        <button
          type="button"
          className="first-item"
          onClick={() =>
            setCurrentPath((p) => {
              const t = p.split("/");
              t.pop();
              return t.join("/");
            })
          }
        >
          ..
        </button>
        <input
          type="text"
          value={currentPathInput}
          onChange={(ev) => setCurrentPathInput(ev.target.value)}
        />
        <button type="button" className="last-item" onClick={() => setCurrentPath(currentPathInput)}>
          &gt;&gt;
        </button>
      </div>
      <div className="filemanager-sidebar">TODO:</div>
      <div className="filemanager-main-container">
        <div className="filemanager-main">
          {files.map(([name, type]) => (
            <div
              key={name}
              className="filemanager-main-item"
              onDoubleClick={() => setCurrentPath((p) => path.join(p, name))}
            >
              <div className="filemanager-main-item-icon">
                <Icon
                  path={getFileIconPath(type)}
                />
              </div>
              <div className="filemanager-main-item-text">{name}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="filemanager-sidebar-footer">sidebar footer</div>
      <div className="filemanager-main-footer">main footer</div>
    </div>
  );
};
