import React, { useContext, useEffect, useState } from "react";
import { checkAuthStatus } from "../Auth/checkAuthStatus";

const AppContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await checkAuthStatus();
      console.log("yoshi?");
      setAuth(authStatus);
      // if (authStatus && location.pathname !== "/register") {
      //   navigate("/login");
      // }
    };

    checkAuth();
  }, []);

  
  
  return (
    <AppContext.Provider value={{ auth, setAuth }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalAuthContext = () => {
  return useContext(AppContext);
};

export { AppContext, AuthProvider };
