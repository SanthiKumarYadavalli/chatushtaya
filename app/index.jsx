import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Linking,
} from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const dialEmergency = () => {
    // Alert.alert("Dialing Emergency", "This will dial 100.");
    // Uncomment the following line to enable real dialing when testing on a device
    Linking.openURL("tel:100");
  };

  return (
    <>
      <SafeAreaView className="flex-1 bg- items-center justify-center bg-white">
        <StatusBar style="black" />
        {/* Emergency Icon */}
        <TouchableOpacity
          onPress={dialEmergency}
          className="absolute top-10 right-5 bg-mylavender p-10 rounded-full shadow-md"
        >
          <Text className="text-lg font-bold text-white">SOS</Text>
        </TouchableOpacity>

        {/* Center Content */}
        <Image
          source={require("../assets/images/women.png")} // Replace with your PNG
          className="w-52 h-72"
          resizeMode="cover"
        />
        {/* <LinearGradient
        colors={["#CDC1FF", "#FFCCEA"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="p-2 rounded"
      > */}
        <Text className="text-2xl text-gray-800 font-plight">Hello there</Text>
        {/* </LinearGradient> */}

        {/* Row Layout */}
        <View className="flex-row justify-between mt-10 w-3/4 gap-5">
          {/* Report Button */}
          <View className="flex-1 gap-3 items-center justify-center">
            <Link href="/report" asChild>
              <TouchableOpacity className="w-36 h-36 rounded-full justify-center items-center shadow-md">
                <Image
                  source={require("../assets/images/report.png")} // Replace with your image
                  className="w-36 h-36 mb-2 rounded-full"
                  resizeMode="cover"
                />
              </TouchableOpacity>
            </Link>
            <Text className="text-center">Report</Text>
          </View>

          {/* Help Button */}
          <View className="flex-1 gap-3 items-center justify-center">
            <Link href="/help" asChild>
              <TouchableOpacity className="w-36 h-36 rounded-full justify-center items-center shadow-md">
                <Image
                  source={require("../assets/images/help.png")} // Replace with your image
                  className="w-36 h-36 mb-2 rounded-full"
                  resizeMode="cover"
                />
                {/* <Text className="text-white font-bold">Help</Text> */}
              </TouchableOpacity>
            </Link>
            <Text className="text-center">Help & Support</Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
