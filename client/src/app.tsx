import "./styles/global.scss";

import { FC, useContext, useEffect, useState } from "react";

import { isLoggedIn as isAuthenticated } from "./api";
import { SessionContext, SessionContextProvider } from "./context/session";

import { HomePage } from "./containers/home";
import { LoginPage } from "./containers/login";
import { LoadingPage } from "./containers/loading";


const HandlePages: FC<{}> = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(SessionContext);
  const [showLoading, setShowLoading ] = useState(true);

  useEffect(() => {
    const i = setInterval(() => setShowLoading(false), 1000);
    return () => clearInterval(i);
  },[]);

  useEffect(() => {
    const checkLogin = async () => {
      const r = await isAuthenticated();
      setIsLoggedIn(r);
    };
    checkLogin();
  }, []);

  if (isLoggedIn === null || showLoading) {
    return <LoadingPage />;
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
