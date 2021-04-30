import "./styles/global.scss";

import { FC, useContext, useEffect } from "react";

import { isLoggedIn as isAuthenticated, logIn } from "./api";
import { SessionContext, SessionContextProvider } from "./context/session";

import { Home } from "./home";
import { LoginForm } from "./loginForm";

const LoadingScreen = () => <h1>Loading...</h1>;

const HandlePages: FC<{}> = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(SessionContext);

  useEffect(() => {
    const checkLogin = async () => {
      const r = await isAuthenticated();
      setIsLoggedIn(r);
    };
    checkLogin();
  }, []);

  if (isLoggedIn === null) {
    return <LoadingScreen />;
  } else if (isLoggedIn) {
    return <Home />;
  } else {
    return <LoginForm />;
  }
};

const App: FC = ({ children }) => {
  return (
    <SessionContextProvider>
      <HandlePages />
      {children}
    </SessionContextProvider>
  );
};

export default App;
