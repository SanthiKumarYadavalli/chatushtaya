import { View, Text, Image } from "react-native";
import { Tabs, Redirect } from "expo-router";
import React from "react";
import TabBar from "../../components/TabBar";

const TabLayout = () => {
  return (
    <>
      <Tabs tabBar={(props) => <TabBar {...props} />}>
        <Tabs.Screen
          name="home"
          options={{ title: "Home", headerShown: false }}
        />
        <Tabs.Screen name="explore" options={{ title: "Explore" }} />
        <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      </Tabs>
    </>
  );
};

export default TabLayout;
