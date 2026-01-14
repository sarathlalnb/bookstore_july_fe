import { createContext, useState } from "react";

export const authContext = createContext();

// we will wrap the app with this Provider, so the children represents the APP component.

export const Authprovider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const saveToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const removeToken = () => {
    localStorage.clear();
    setToken(null);
  };

  return (
    // this means we will wrap authProvider with App.jsx and app can access the authContext, which provides the values
    <authContext.Provider value={{ token, saveToken, removeToken }}>
      {children}
    </authContext.Provider>
  );
};
