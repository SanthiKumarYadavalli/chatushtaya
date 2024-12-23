import React from "react";
import { View, Text, TouchableOpacity, TextInput, Pressable } from "react-native";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useReportContext } from "../../context/ReportProvider";
import FormScreen from "../../components/FormScreen";

export default function Details() {
  const { formData, changeValue } = useReportContext();
  const navigation = useNavigation();
  return (
    <FormScreen
      heading="More Details (Optional)"
      disabledContidion={false}
      buttonOnPress={() => navigation.reset({ index: 0, routes: [{ name: "success" }]})}
      buttonText="Submit"
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
      <View className="flex-row items-center mb-4">
        <Pressable
          onPress={() => changeValue("isAnonymous", !formData.isAnonymous)}
          className="flex-row items-center mr-4"
        >
          <View
            className={`w-8 h-8 border-2 rounded-md ${
              formData.isAnonymous
                ? "bg-mylavender border-mylavender"
                : "border-gray-300"
            } flex items-center justify-center`}
          >
            {formData.isAnonymous && (
              <Ionicons name="checkmark" size={16} color="white" />
            )}
          </View>
        </Pressable>
        <TouchableOpacity onPress={() => changeValue("isAnonymous", !formData.isAnonymous)}>
          <Text className="text-lg font-medium text-gray-800">
            Submit Anonymously
          </Text>
        </TouchableOpacity>
      </View>
    </FormScreen>
  );
}
