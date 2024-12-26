import React from "react";
import { router } from "expo-router";
import { Text, View, TouchableOpacity, Image, Pressable } from "react-native";
import FormScreen from "../../components/FormScreen";
import { useReportContext } from "../../context/ReportProvider";
import * as DocumentPicker from "expo-document-picker";
import { Plus } from "lucide-react-native";


export default function UploadForm() {
  const { formData, changeValue, clearValue } = useReportContext();

  const pickImage = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
      multiple: true,
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
      onSkip={() => {
        clearValue("evidence");
        router.push("details");
      }}
      skipButton={true}
    >
      <Text className="mb-10">
        Supported Files: images, video, audio
      </Text>
      <View className="w-[80%] h-1/3 border border-mypink rounded-2xl items-center justify-center">
        <Pressable
          className="w-full h-full rounded-2xl items-center justify-center"
          android_ripple={{ color: "#eee" }}
          onPress={pickImage}
        >
          <Plus color="#79D1C3" size={69} strokeWidth={1} />
        </Pressable>
      </View>

      {formData.evidence.assets.length > 0 && (
        <View className="mt-7">
          <Text className="text-green-600">{formData.evidence.assets.length} files added!</Text>
        </View>
      )}
    </FormScreen>
  );
}
