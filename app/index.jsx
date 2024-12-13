import React, { useEffect, useState } from "react";
import Login from "./login";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return <Login onLoginSuccess={handleLoginSuccess} />;
};

export default App;
