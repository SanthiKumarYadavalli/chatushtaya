import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  Pressable,
  Button,
} from "react-native";
import { Link, Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import { useAuthContext } from "../context/AuthProvider";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Login from "./login";
import { Toast } from "toastify-react-native";
const Home = () => {
  const dialEmergency = () => {
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
          <Feather name="phone-call" size={38} color="#f72c5b" />
        </TouchableOpacity>

        {/* Emergency Icon */}
        <TouchableOpacity
          onPress={() => router.push("/profile")}
          className="absolute bottom-7 left-5 rounded-full p-4 border border-[#ccd4dbe0]"
        >
          <FontAwesome name="user-o" size={28} color="#2a2d30e0+" />
        </TouchableOpacity>

        {/* Main Content */}
        <View className="flex-1 items-center justify-center mt-5">
          {/* Center Content */}
          <View className="mt-8 h-1/2">
            <Image
              source={require("../assets/images/women.png")} // Replace with your PNG
              className="w-52 h-52 mt-12"
              resizeMode="cover"
            />
            <Text className="text-5xl mt-8 font-pextralight text-center">
              Hello there!
            </Text>
            <Text className="text-xl mt-3 font-pextralight text-center">
              {user.email}
            </Text>
          </View>

          {/* Roadmap Section */}
          <View className="flex-1 mt-2 w-full items-center justify-center">
            {/* Roadmap Section */}
            <View className="flex-1 mt-2 w-full items-center justify-center">
              {/* Report Button (Left) */}
              <View className="absolute left-3 top-5 items-center gap-2">
                <Link href="/ai" asChild>
                  <TouchableOpacity className="w-32 h-32 bg-white rounded-full justify-center items-center shadow-2xl border border-[#f72c5ba6]">
                    <Image
                      source={require("../assets/images/help.jpg")} // Replace with your image
                      className="w-full h-full  rounded-full"
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                </Link>
                <Text className="text-lg font-pregular text-gray-800">
                  Help & Support
                </Text>
              </View>

              {/* Help Button (Right) */}
              <View className="absolute right-3 bottom-10 items-center py-5 gap-2">
                <Link href="/(form)/type" asChild>
                  <TouchableOpacity className="w-48 h-48 bg-white rounded-full justify-center items-center shadow-2xl border border-[#1766e4]">
                    <Image
                      source={require("../assets/images/feather.png")} // Replace with your image
                      className=" w-full h-full rounded-full"
                      resizeMode="contain"
                    />
                    {/* <AntDesign name="plus" size={160} color="black" /> */}
                  </TouchableOpacity>
                </Link>
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
