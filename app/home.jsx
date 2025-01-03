import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  Pressable,
  Button,
} from "react-native";
import { Link, Redirect, router, useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthContext } from "../context/AuthProvider";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Login from "./login";
import { Feather, HandHeart, PhoneCall } from "lucide-react-native";
import { sendLocation } from "../utils/notifications";
const Home = () => {
  const navigation = useNavigation();
  const dialEmergency = async () => {
    await sendLocation();
    Linking.openURL("tel:100");
  };
  const { user } = useAuthContext();
  if (!user) {
    return <Login />;
  }

  return (
    <>
      <SafeAreaView className="flex-1 bg-white px-4">
        <StatusBar style="black" />

        <TouchableOpacity
          onPress={dialEmergency}
          className="absolute top-9 right-5 rounded-full p-3"
        >
          <PhoneCall size={38} color="red" absoluteStrokeWidth={1} />
        </TouchableOpacity>

        {/* Emergency Icon */}
        <TouchableOpacity
          onPress={() => router.push("/profile")}
          className="absolute bottom-7 left-5 rounded-full p-4 border border-[#ccd4dbe0]"
        >
          <FontAwesome name="user-o" size={28} color="#2a2d30e0+" />
        </TouchableOpacity>

        {/* Main Content */}
        <View className="flex-1 items-center justify-center">
          {/* Center Content */}
          <View className="mt-12 h-1/2 justify-center  items-center">
            <Image
              source={require("../assets/images/women.png")}
              className="w-52 h-52"
              resizeMode="cover"
            />
            <Text className="text-5xl mt-8 font-pextralight text-center">
              Hello there!
            </Text>
            <Text className="text-xl mt-3 font-pextralight text-center">
              {user.username}
            </Text>
          </View>

          {/* Roadmap Section */}
          <View className="flex-1 mt-2 w-full items-center justify-center">
            {/* Roadmap Section */}
            <View className="flex-1 mt-2 w-full items-center justify-center">
              {/* Report Button (Left) */}
              <View className="absolute left-3 top-5 items-center gap-2">
                <View className="bg-white rounded-full overflow-hidden justify-center items-center shadow-2xl border border-[#f72c5ba6]">
                  <Pressable
                    android_ripple={{ color: "#eee"}}
                    className="w-32 h-32 rounded-full items-center justify-center"
                    onPress={() => navigation.push("(tabs)")}
                  >
                    {/* <Image
                      source={require("../assets/images/help.jpg")} // Replace with your image
                      className="w-full h-full  rounded-full"
                      resizeMode="cover"
                    /> */}
                    <HandHeart color="#f72c5b" size={50} strokeWidth={1}/>
                  </Pressable>
                </View>
                <Text className="text-lg font-pregular text-gray-800">
                  Help & Support
                </Text>
              </View>

              {/* Help Button (Right) */}
              <View className="absolute right-3 bottom-10 items-center py-5 gap-2">
                  <View className="bg-white rounded-full justify-center overflow-hidden items-center shadow-2xl border border-[#1766e4]">
                    <Pressable
                      android_ripple={{color: "#eee"}}
                      onPress={() => navigation.navigate("(form)")}
                      className="w-48 h-48 rounded-full items-center justify-center"
                    >
                      <Feather color="#1766e4" size={50} strokeWidth={1}/>
                    </Pressable>
                  </View>
                <Text className="text-lg font-pregular text-gray-800">
                  Report
                </Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Home;
