import { View, Text } from "react-native";
import { Tabs } from "expo-router";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { MessageCircleHeart } from "lucide-react-native";

const icons = {
  Contacts: (props) => (
    <AntDesign name="contacts" size={24} color={props.color} />
  ),
  Naira: (props) => <MessageCircleHeart size={24} color={props.color} />,
  Reports: (props) => <AntDesign name="form" size={24} color={props.color} />,
  default: (props) => (
    <Feather name="question-mark" size={24} color={props.color} />
  ),
};

const TabIcon = ({ color, name, focused }) => {
  return (
    <>
      <View className="items-center justify-center gap-1 w-16">
        {icons[name]({ color })}
        <Text
          className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
          style={{ color }}
        >
          {name}
        </Text>
      </View>
    </>
  );
};

const TabLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#f72c5b",
          tabBarInactiveTintColor: "black",
          tabBarStyle: {
            height: 72,
          },
          tabBarItemStyle: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <Tabs.Screen
          name="contact"
          options={{
            title: "Contacts",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon color={color} focused={focused} name="Contacts" />
            ),
          }}
        />
        <Tabs.Screen
          name="ai"
          options={{
            title: "Ai",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon color={color} focused={focused} name={"Naira"} />
            ),
          }}
        />{" "}
        <Tabs.Screen
          name="reports"
          options={{
            title: "Reports",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon color={color} focused={focused} name={"Reports"} />
            ),
          }}
        />{" "}
      </Tabs>
    </>
  );
};

export default TabLayout;
