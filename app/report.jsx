import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ChooseTypeScreen = () => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const types = [
    "Type 1",
    "Type 2",
    "Type 3",
    "Type 4",
    "Type 5",
    "Type 6",
    "Type 7",
  ];

  const toggleSelection = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes((prev) => prev.filter((t) => t !== type));
    } else {
      setSelectedTypes((prev) => [...prev, type]);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-10 min-h-full">
      <View className="p-5 mt-4">
        <Text className="text-left text-3xl font-pregular">Choose a type</Text>
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
          <TouchableOpacity
            key={index}
            className={`px-4 mb-3 rounded-lg  border w-full ${
              selectedTypes.includes(type)
                ? "bg-mylavender border-transparent"
                : "bg-white border-gray-300"
            }`}
            style={{ paddingVertical: 15 }}
            onPress={() => toggleSelection(type)}
          >
            <Text
              className={`text-lg font-medium ${
                selectedTypes.includes(type) ? "text-white" : "text-grey-600"
              }`}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Next Button */}
      <View className="p-5">
        <TouchableOpacity
          className="py-4 bg-blue-600 rounded-lg"
          onPress={() => alert(`Selected Types: ${selectedTypes.join(", ")}`)}
        >
          <Text className="text-center text-lg font-bold text-white">Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChooseTypeScreen;
