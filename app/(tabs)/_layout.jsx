import { View, Text, Image } from "react-native";
import { Tabs, Redirect } from "expo-router";
import React from "react";
import TabBar from "../../components/TabBar";

const TabLayout = () => {
  return (
    <>
      <Tabs tabBar={(props) => <TabBar {...props} initialRouteName="ai" />}>
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
    </>
  );
};

export default TabLayout;
