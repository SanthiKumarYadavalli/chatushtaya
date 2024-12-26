import { images } from "../constants";

import React from "react";
import { View, Text, StyleSheet, Button, ImageBackground ,TouchableOpacity} from "react-native";
import Swiper from "react-native-swiper";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
// import {index1} from "../constants/images"
export default function Landing() {
  return (
    <>
    <StatusBar hidden={true} />
    <Swiper
      loop={false}
      showsPagination={true}
      dotStyle={styles.dot}
      activeDotStyle={styles.activeDot}
    >
      <View style={styles.slide}>
        <ImageBackground
          source={require("../assets/images/index1.png")}
          className="w-full h-full"
          resizeMode="contain"
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        ></ImageBackground>
      </View>
      <View style={styles.slide}>
        <ImageBackground
          source={require("../assets/images/index3.png")}
          className="w-full h-full"
          resizeMode="cover"
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        ></ImageBackground>
      </View>
      <View style={styles.slide}>
        <ImageBackground
          source={require("../assets/images/index2.png")}
          className="w-full h-full"
          resizeMode="contain"
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View className="absolute bottom-20 w-full flex items-center">
    <TouchableOpacity
      className="bg-white border-2 border-black text-black flex items-center justify-center w-[200px] h-[50px] rounded-xl"
      onPress={() => router.replace("login")}
    >
      <Text className="text-black text-3xl font-medium">
        Get started →
      </Text>
    </TouchableOpacity>
  </View>
        </ImageBackground>
      </View>
    </Swiper>
    </>
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  dot: {
    backgroundColor: "#fff",
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  activeDot: {
    backgroundColor: "#860afd",
    width: 10,
    height: 20,
    borderRadius: 5,
  },
});
