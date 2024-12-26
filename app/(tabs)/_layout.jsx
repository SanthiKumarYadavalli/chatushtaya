import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import Ai from "./ai";
import Contact from "./contact";
import ReportsScreen from "./reports";
import AntDesign from "@expo/vector-icons/AntDesign";
import { MessageCircleHeart } from "lucide-react-native";

const Tab = createMaterialBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="contacts"
      activeColor="#f72c5b"
      barStyle={{ backgroundColor: "white" }}
      theme={{ colors: { secondary: "black" } }}
      tabBarOptions={{
        keyboardHidesTabBar: true,
      }}
      screenOptions={{
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="contacts"
        component={Contact}
        options={{
          tabBarLabel: "Contacts",
          tabBarIcon: ({ color }) => (
            <AntDesign name="contacts" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ai"
        component={Ai}
        options={{
          tabBarLabel: "Naira",
          tabBarIcon: ({ color }) => (
            <MessageCircleHeart size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="reports"
        component={ReportsScreen}
        options={{
          tabBarLabel: "Reports",
          tabBarIcon: ({ color }) => (
            <AntDesign name="form" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
