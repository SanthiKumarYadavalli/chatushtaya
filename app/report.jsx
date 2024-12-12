import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ChooseTypeScreen = () => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const types = [
    "Verbal Abuse",
    "Sexual Harassment",
    "Bullying",
    "Stalking",
    "Cyber harassment",
    "Discrimination",
    "Abuse of Authority by Staff or Faculty"
  ];

  const toggleSelection = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes((prev) => prev.filter((t) => t !== type));
    } else {
      setSelectedTypes((prev) => [...prev, type]);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-7 min-h-full">
      <View className="">
        <Text className="text-left text-3xl mt-10 font-pregular">Choose a type</Text>
      </View>

      {/* Selectable Items */}
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 20,
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        {types.map((type, index) => (
          <Pressable
            key={index}
            className={`px-4 mb-3 rounded-lg  border w-full ${
              selectedTypes.includes(type)
                ? "bg-mylavender border-transparent"
                : "bg-white border-gray-300"
            }`}
            style={{ paddingVertical: 15, backgroundColor: "#" }}
            onPress={() => toggleSelection(type)}
          >
            <Text
              className={`font-plight ${
                selectedTypes.includes(type) ? "text-white" : "text-grey-600"
              }`}
            >
              {type}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Next Button */}
      <View className="">
        <Pressable
          className="py-4 bg-mypink rounded-xl w-full"
          onPress={() => alert(`Selected Types: ${selectedTypes.join(", ")}`)}
        > 
          <Text className="text-center text-lg font-bold text-white">Next</Text>
        </Pressable>
      </View>
    <StatusBar style="auto light" />
    </SafeAreaView>
  );
};

export default ChooseTypeScreen;
