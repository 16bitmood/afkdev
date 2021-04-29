import { createContext, FC, useState } from "react";
import { logIn, logOut } from "../api";

export type SessionContextType = {
  isLoggedIn: null | boolean;
  setIsLoggedIn: (to: boolean) => void;
  sessionLogout: () => Promise<void>;
  sessionLogin: (u: string, p: string) => Promise<boolean>;
};

export const initialSessionContext: SessionContextType = {
  isLoggedIn: null,
  setIsLoggedIn: () => {},
  sessionLogout: () => new Promise(() => {}),
  sessionLogin: () => new Promise((r, _r) => r(false)),
};

export const SessionContext = createContext(initialSessionContext);

export const SessionContextProvider: FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<null | boolean>(null);

  const ctx: SessionContextType = {
    isLoggedIn,
    setIsLoggedIn,
    sessionLogout: async () => {
      await logOut();
      setIsLoggedIn(false);
    },
    sessionLogin: async (username: string, password: string) => {
      const r = await logIn(username, password);
      if (r) { setIsLoggedIn(true); }
      return r;
    },
  };

  return (
    <SessionContext.Provider value={ctx}>
      {children}
    </SessionContext.Provider>
  );
};
