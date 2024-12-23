import React from "react";
import { router } from "expo-router";
import { Text, View, TouchableOpacity, Image } from "react-native";
import FormScreen from "../../components/FormScreen";
import { useReportContext } from "../../context/ReportProvider";
import * as DocumentPicker from "expo-document-picker";
import { Plus } from "lucide-react-native";


export default function UploadForm() {
  const { formData, changeValue } = useReportContext();

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
    >
      <Text className="mb-10">
        Supported Files: images, video, audio
      </Text>
      <TouchableOpacity onPress={pickImage} className="w-[80%] h-1/3 border border-mypink rounded-2xl items-center justify-center">
        <Plus color="#79D1C3" size={69} strokeWidth={1} />
      </TouchableOpacity>

      {formData.evidence.assets.length > 0 && (
        <View className="mt-7">
          <Text className="text-green-600">{formData.evidence.assets.length} files added!</Text>
        </View>
      )}
    </FormScreen>
  );
}
