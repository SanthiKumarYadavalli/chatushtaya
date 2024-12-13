import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DatePicker from "react-native-modern-datepicker";


const ChooseTypeScreen = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    types: [],
    date: '',
  });
  const types = [
    "Verbal Abuse",
    "Sexual Harassment",
    "Bullying",
    "Stalking",
    "Cyber harassment",
    "Discrimination",
    "Abuse of Authority by Staff or Faculty"
  ];

  const toggleTypes = (type) => {
    if (formData.types.includes(type)) {
      setFormData({...formData, types: formData.types.filter((t) => t !== type)});
    } else {
      setFormData({...formData, types: [...formData.types, type]});
    }
  };
  switch (step) {
    case 0:
      return (
        <SafeAreaView className="flex-1 bg-white p-7 min-h-full">
          <View>
            <Text className="text-left text-3xl mt-10 font-pregular">Choose a type</Text>
          </View>

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
                className={`px-4 mb-3 rounded-lg  border w-full transition-all duration-700 ${
                  formData.types.includes(type)
                    ? "bg-mypink border-transparent"
                    : "bg-white border-gray-300"
                }`}
                style={{ paddingVertical: 15 }}
                onPress={() => toggleTypes(type)}
              >
                <Text
                  className={`font-plight ${
                    formData.types.includes(type) ? "text-white" : "text-grey-600"
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
              className={`py-4 rounded-xl w-full bg-mylavender`}
              onPress={() => setStep(1)}
              disabled={formData.types.length === 0}
              style={{opacity : (formData.types.length === 0 ? 0.5 : 1)}}
            > 
              <Text className="text-center text-lg font-bold text-white">Next</Text>
            </Pressable>
          </View>
        <StatusBar style="auto light" />
        </SafeAreaView>
      );
    case 1:
      return (
        <SafeAreaView className="flex-1 bg-white p-7 min-h-full">
          <View>
            <Text className="text-left text-3xl mt-10 font-pregular">Enter Date and Time</Text>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
          >
            <DatePicker mode='time' onTimeChange={(date) => setFormData({...formData, date})} style={{ marginBottom: -120 }} />
            <DatePicker mode='calendar' onTimeChange={(date) => setFormData({...formData, date})} selected="23" />
          </ScrollView>

          {/* Next Button */}
          <View className="">
            <Pressable
              className={`py-4 rounded-xl w-full bg-mylavender`}
              onPress={() => setStep(1)}
              disabled={formData.types.length === 0}
              style={{opacity : (formData.types.length === 0 ? 0.5 : 1)}}
            > 
              <Text className="text-center text-lg font-bold text-white">Next</Text>
            </Pressable>
          </View>
        <StatusBar style="auto light" />
        </SafeAreaView>
      );
  }
};

export default ChooseTypeScreen;
