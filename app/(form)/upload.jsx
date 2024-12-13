import React from "react";
import { router } from "expo-router";
import { Text, View, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import FormScreen from "../../components/FormScreen";
import { useReportContext } from "../../context/ReportProvider";

export default function UploadForm() {
  const { formData, changeValue } = useReportContext();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsMultipleSelection: true,
    });
    if (!result.canceled) {
      changeValue("evidence", result);
    }
  };

  return (
    <FormScreen
      heading="Upload Evidence"
      disabledContidion={false}
      buttonOnPress={() => router.push("details")}
    >
      <View className="w-full border border-mypink rounded-2xl">
        <TouchableOpacity onPress={pickImage} className="py-5 px-5">
          <Text className="text-center">Upload Images and Videos</Text>
        </TouchableOpacity>
      </View>
    </FormScreen>
  );
}
