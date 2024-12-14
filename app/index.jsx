import React, { useEffect, useState } from "react";
import Login from "./login";
import { useAuthContext } from "../context/AuthProvider";
import { Redirect } from "expo-router";
import Landing from "./landing";

const App = () => {
  const { isLogged, user } = useAuthContext();

  if (isLogged || user) {
    return <Redirect href={"/landing"} />;
  }

  return <Login />;
};

export default App;
