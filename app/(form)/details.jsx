import React from "react";
import { View, TextInput } from "react-native";
import { router } from "expo-router";
import { useReportContext } from "../../context/ReportProvider";
import FormScreen from "../../components/FormScreen";

export default function Details() {
  const { changeValue, clearValue } = useReportContext();
  return (
    <FormScreen
      heading="More Details"
      disabledContidion={false}
      skipButton={true}
      buttonOnPress={() => router.push("anonymous")}
      onSkip={() => {
        clearValue("harasserDetails");
        clearValue("additionalInfo");
        router.push("anonymous");
      }}
      buttonText="Next"
    >
      <View
        className="items-center justify-center mb-4 w-full"
        style={{ height: "90%" }}
      >
        <TextInput
          className="px-6 py-4 mb-3 w-full h-24 rounded-lg text-lg text-pregular bg-white border border-gray-300 text-gray-800"
          placeholder="Enter Harasser's Details"
          multiline
          numberOfLines={10}
          onChangeText={(text) => changeValue("harasserDetails", text)}
        />
        <TextInput
          className="px-6 py-4 mb-3 w-full h-24 rounded-lg text-lg text-pregular bg-white border border-gray-300 text-gray-800"
          placeholder="Enter Additional Information"
          multiline
          numberOfLines={10}
          onChangeText={(text) => changeValue("additionalInfo", text)}
        />
      </View>
    </FormScreen>
  );
}
