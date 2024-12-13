import React, { useEffect, useState } from "react";
import Login from "./login";
import { useAuthContext } from "../context/AuthProvider";
import { Redirect } from "expo-router";

const App = () => {
  const { isLogged, user } = useAuthContext();

  if (isLogged || user) {
    return <Redirect href={"/home"} />;
  }

  return <Login />;
};

export default App;
