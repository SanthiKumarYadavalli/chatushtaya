import React, { useEffect } from "react";
import { useAuthContext } from "../context/AuthProvider";
import { router, useNavigation } from "expo-router";

import LoadingScreen from "./(form)/loading";

const App = () => {
  const { user } = useAuthContext();
  const navigation = useNavigation();
  useEffect(() => {
    if (!user) {
      navigation.reset({ index: 0, routes: [{ name: "landing" }] });
    } else {
      navigation.reset({ index: 0, routes: [{ name: "home" }] });
    }
  }, [user, navigation]);
  return <LoadingScreen />;
};

export default App;
