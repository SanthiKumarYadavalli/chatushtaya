import React from "react";
import { useAuthContext } from "../context/AuthProvider";
import { Redirect } from "expo-router";
import Landing from "./landing"

const App = () => {
  const { user } = useAuthContext();
  if (user) {
    return <Redirect href="home" />
  }
  return <Landing />
};

export default App;

