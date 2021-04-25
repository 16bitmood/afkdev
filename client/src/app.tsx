import { useEffect, useState } from "react";

import { logIn, logOut, isLoggedIn as isAuthenticated } from "./api";

const LoadingScreen = () => <>Loading</>;

const Home = (props: { onLogout: () => void }) => {
    const handleClick: React.MouseEventHandler = async (ev) => {
        ev.preventDefault();
        if (await logOut()) {
          props.onLogout();
        }
    };

    return (
    <>
      <h1>Login Successful</h1>
      <button onClick={handleClick}>Logout</button>
    </>
    );
};

const LoginForm = (props: { onLogin: () => void }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [incorrectAttempt, setIncorrectAttempt] = useState(false);

  const handleSubmit = async (ev: any) => {
    ev.preventDefault();
    const isAuthenticated = await logIn(username, password);
    if (isAuthenticated) {
        props.onLogin();
    } else {
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
          <p>Username:</p>
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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect( () => {
      isAuthenticated().then((status) => setIsLoggedIn(status));
  },[]);

  if (isLoggedIn === null) {
    return <LoadingScreen />;
  } else if (isLoggedIn) {
    return <Home onLogout={() => setIsLoggedIn(false)} />;
  } else {
    return <LoginForm onLogin={() => setIsLoggedIn(true)} />;
  }
}

export default App;
