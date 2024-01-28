import React, { createContext, useContext, useState } from "react";

const YourContext = createContext();

const useAppContext = () => {
  const context = useContext(YourContext);
  if (!context) {
    throw new Error("useAppContext must be used within a ContextProvider");
  }
  return context;
};

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const contextValue = {
    user,
    setUser,
  };

  return (
    <YourContext.Provider value={contextValue}>
      {children}
    </YourContext.Provider>
  );
};

export { YourContext, ContextProvider, useAppContext };
