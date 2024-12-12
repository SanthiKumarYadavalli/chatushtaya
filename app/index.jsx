import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  Pressable,
} from "react-native";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";

const HomeScreen = () => {
  const dialEmergency = () => {
    Linking.openURL("tel:100");
  };

  return (
    <>
      <SafeAreaView className="flex-1 bg-white px-4">
        <StatusBar style="black" />

        {/* Emergency Icon */}
        <TouchableOpacity
          onPress={dialEmergency}
          className="absolute top-10 right-5 rounded-full p-3"
        >
          <Feather name="phone-call" size={38} color="#FF2929" />
        </TouchableOpacity>

        {/* Main Content */}
        <View className="flex-1 items-center justify-center mt-5">
          {/* Center Content */}
          <View className="mt-8">
            <Image
              source={require("../assets/images/women.png")} // Replace with your PNG
              className="w-64 h-96"
              resizeMode="contain"
            />
            <Text className="text-5xl -mt-7 font-plight text-center">
              Hello there
            </Text>
          </View>

          {/* Roadmap Section */}
          <View className="flex-1 mt-2 w-full items-center justify-center">
            {/* Report Button (Left) */}
            <View className="absolute left-3 top-5 items-center">
              <Link href="/report" asChild>
                <TouchableOpacity className="w-32 h-32 bg-[#CDC1FF] rounded-full justify-center items-center shadow-lg">
                  <Image
                    source={require("../assets/images/help.png")} // Replace with your image
                    className="w-32 h-32  rounded-full"
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              </Link>
              <Text className="text-lg font-pregular text-gray-800">
                Help & Support
              </Text>
            </View>

            {/* Help Button (Right) */}
            <View className="absolute right-3 bottom-10 items-center py-5">
              <Link href="/help" asChild>
                <TouchableOpacity className="w-48 h-48 bg-[#FFCCEA] rounded-full justify-center items-center shadow-lg">
                  <Image
                    source={require("../assets/images/r1.png")} // Replace with your image
                    className="w-48 h-48  rounded-full"
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              </Link>
              <Text className="text-lg font-pregular text-gray-800">
                Report
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
