import React, { useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Sma from "./Sma";
import { isAuthenticated } from "../Utils/AuthUtil";
import { AuthContext } from "../context/AuthContext";

const App = () => {
  const { userAuth, mapAuthToContext } = useContext(AuthContext);

  useEffect(() => {
    if (!userAuth.userId && isAuthenticated()) mapAuthToContext();
  }, []);

  return (
    <BrowserRouter>
      <Sma />
    </BrowserRouter>
  );
};

export default App;
