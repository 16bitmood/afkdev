import "./styles/global.scss";

import { FC, useContext, useEffect } from "react";

import { isLoggedIn as isAuthenticated } from "./api";
import { SessionContext, SessionContextProvider } from "./context/session";

import { HomePage } from "./containers/home";
import { LoginPage } from "./containers/login";

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
    return <HomePage />;
  } else {
    return <LoginPage />;
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
