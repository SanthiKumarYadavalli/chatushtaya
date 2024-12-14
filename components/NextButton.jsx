import { Alert, Pressable, Text, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import { createReport } from "../backend/utils";
import { useReportContext } from "../context/ReportProvider";

const NextButton = ({ disabledContidion, onPress, text = "Next" }) => {
  const { formData } = useReportContext();

  async function handlePress() {
    try {
      if (text == "Submit") {
        router.push("loading");
        await createReport(formData);
      }
      onPress();
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  }

  return (
    <View className="">
      <Pressable
        className={`py-4 rounded-xl w-full bg-mylavender`}
        onPress={handlePress}
        disabled={disabledContidion}
        style={{ opacity: disabledContidion ? 0.5 : 1 }}
      >
        <Text className="text-center text-lg text-white font-pmedium">
          {text}
        </Text>
      </Pressable>
    </View>
  );
};

export default NextButton;
