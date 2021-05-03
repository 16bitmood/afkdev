import "../styles/login.scss";

import { FC, FormEventHandler, useContext, useState } from "react";

import { SessionContext } from "../contexts";

export const LoginPage: FC = () => {
  const { sessionLogin } = useContext(SessionContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [incorrectAttempt, setIncorrectAttempt] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleSubmit: FormEventHandler = async (ev) => {
    ev.preventDefault();
    const r = await sessionLogin(username, password);
    if (!r) {
      setIncorrectAttempt(true);
      setAttempts((a) => a + 1);
    }
  };

  const headerClick = () => {};

  return (
    <div className="wrapper-login-form">
      {/* eslint-disable-next-line */}
      <header onClick={headerClick}>&lt;AFKDEV&gt;</header>
      <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
        <input
          type="text"
          placeholder="USERNAME"
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <input
          type="password"
          placeholder="PASSWORD"
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <input type="submit" value="login" />
        {incorrectAttempt ? (
          <div className="alert"> {attempts} Incorrect Attempts! </div>
        ) : (
          <></>
        )}
      </form>
      <button type="button">about</button>
    </div>
  );
};
