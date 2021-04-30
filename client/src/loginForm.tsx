import "./styles/loginForm.scss";

import { FC, useContext, useState } from "react";
import { mdiAccountOutline, mdiLockOutline } from '@mdi/js';
import { Icon } from '@mdi/react';

import { SessionContext } from "./context/session";

export const LoginForm: FC = () => {
  const { sessionLogin } = useContext(SessionContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [incorrectAttempt, setIncorrectAttempt] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = async (ev: any) => {
    ev.preventDefault();
    const r = await sessionLogin(username, password);
    if (!r) {
      setIncorrectAttempt(true);
      setAttempts(a => a + 1);
    }
  };
  const Alert: FC<{a: number}> = ({a}) => {
    return <div className='alert'> {a} Incorrect Attempts </div>
  }

  const headerClick = () => {
  }

  return (
    <div className='wrapper-login-form'>
      <header onClick={headerClick}>&lt;AFKDEV&gt;</header>
      <form className='login-form' onSubmit={handleSubmit}  autoComplete='off'>
        <input
          type="text"
          placeholder= 'USERNAME'
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <input
          type="password"
          placeholder='PASSWORD'
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <input type="submit" value="login"/>
        {incorrectAttempt ? <Alert a={attempts}/> : <></>}
      </form>
    </div>
  );
};
