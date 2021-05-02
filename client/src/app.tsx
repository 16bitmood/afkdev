import "./styles/global.scss";

import { FC, useContext, useEffect } from "react";

import { isLoggedIn as isAuthenticated } from "./api";
import { SessionContext, SessionContextProvider } from "./context/session";

import { HomePage } from "./containers/home";
import { LoginPage } from "./containers/login";
import { LoadingPage } from "./containers/loading";

const HandlePages: FC = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(SessionContext);

  useEffect(() => {
    const checkLogin = async () => {
      const r = await isAuthenticated();
      setIsLoggedIn(r);
    };
    checkLogin();
  }, []);

  if (isLoggedIn === null) {
    return <LoadingPage />;
  }
  if (isLoggedIn) {
    return <HomePage />;
  }
  return <LoginPage />;
};

const App: FC = ({ children }) => (
  <SessionContextProvider>
    <HandlePages />
    {children}
  </SessionContextProvider>
);

export default App;
