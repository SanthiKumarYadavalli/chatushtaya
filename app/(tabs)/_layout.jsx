import React, { useState, useEffect } from "react";
import { Keyboard } from "react-native";
import { Tabs } from "expo-router";
import TabBar from "../../components/TabBar";

const TabLayout = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <Tabs
      tabBar={(props) => (!isKeyboardVisible ? <TabBar {...props} /> : null)}
    >
      <Tabs.Screen
        name="contact"
        options={{ title: "Contacts", headerShown: false }}
      />
      <Tabs.Screen name="ai" options={{ title: "AI", headerShown: false }} />
      <Tabs.Screen
        name="profile"
        options={{ title: "Profile", headerShown: false }}
      />
    </Tabs>
  );
};

export default TabLayout;
