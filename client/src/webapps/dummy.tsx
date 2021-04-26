// import { Component, useContext } from "react"
// import { AppsContext } from '../context/apps';

export const Dummy = (props: { killApp: () => void }) => {
  return (
    <div style={{ border: "10px", borderBlockColor: "black" }}>
      <button onClick={props.killApp}> kill this app </button>
    </div>
  );
};
