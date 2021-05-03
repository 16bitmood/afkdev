import "./styles/global.scss";

import { FC, useState, useContext, useEffect } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import { isLoggedIn as isAuthenticated } from "./api";
import { SessionContext, SessionContextProvider } from "./contexts";

import { HomePage } from "./containers/home";
import { LoginPage } from "./containers/login";
import { LoadingPage } from "./containers/loading";

const HandlePages: FC = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(SessionContext);
  const [currentPage, setCurrentPage] = useState(isLoggedIn ? 3 : 1);

  useEffect(() => {
    const checkLogin = async () => {
      const r = await isAuthenticated();
      setIsLoggedIn(r);
      if (r) {
        setCurrentPage(3);
      } else {
        setCurrentPage(2);
      }
    };
    checkLogin();
  }, [isLoggedIn]);

  const getPage = (id: number) => {
    switch (id) {
      case 1:
        return <LoadingPage />;
      case 2:
        return <LoginPage />;
      case 3:
        return <HomePage />;
      default:
        throw new Error("");
    }
  };

  return (
    <SwitchTransition>
      <CSSTransition
        key={currentPage}
        unmountOnExit
        timeout={500}
        classNames={currentPage !== 3 ? "fade-transition" : "expand-transition"}
      >
        {getPage(currentPage)}
      </CSSTransition>
    </SwitchTransition>
  );
};

const App: FC = ({ children }) => (
  <SessionContextProvider>
    <HandlePages />
    {children}
  </SessionContextProvider>
);

export default App;
