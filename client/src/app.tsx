import { FC, useContext, useEffect, useState } from "react";

import { isLoggedIn as isAuthenticated, logIn } from "./api";
import { SessionContext, SessionContextProvider } from "./context/session";

import { Home } from "./home";

const LoadingScreen = () => <h1>Loading...</h1>;

const LoginForm = () => {
  const { sessionLogin } = useContext(SessionContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [incorrectAttempt, setIncorrectAttempt] = useState(false);

  const handleSubmit = async (ev: any) => {
    ev.preventDefault();
    const r = await sessionLogin(username, password);
    if (!r) {
      setIncorrectAttempt(true);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username:</p>
          <input type="text" onChange={(ev) => setUsername(ev.target.value)} />
        </label>
        <label>
          <p>Password:</p>
          <input
            type="password"
            onChange={(ev) => setPassword(ev.target.value)}
          />
        </label>
        <div>
          <button type="submit"> Submit </button>
        </div>
      </form>
      {incorrectAttempt ? <>Incorrect Credentials!</> : <></>}
    </>
  );
};

const HandlePages:FC<{}> = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(
    SessionContext
  );

  useEffect(() => {
    const checkLogin = async () => {
      const r = await isAuthenticated();
      setIsLoggedIn(r);
    }
    checkLogin();
  }, []);

  if (isLoggedIn === null) {
    return <LoadingScreen />;
  } else if (isLoggedIn) {
    return <Home />;
  } else {
    return <LoginForm />;
  }
}

const App:FC<{}> = () => {
  return (
    <SessionContextProvider>
      <HandlePages/>
    </SessionContextProvider>
  );
}



export default App;
