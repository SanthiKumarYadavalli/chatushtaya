import React, { useEffect } from "react";
import { Text, Pressable } from "react-native";
import { router } from "expo-router";
import FormScreen from "../../components/FormScreen";
import { useReportContext } from "../../context/ReportProvider";

export default function ChooseTypeScreen() {
  const { formData, changeValue, resetData } = useReportContext();

  useEffect(() => {
    resetData();
  }, []);

  const types = [
    "Verbal Abuse",
    "Sexual Harassment",
    "Bullying",
    "Stalking",
    "Cyber harassment",
    "Discrimination",
    "Abuse of Authority by Staff or Faculty",
  ];
  const toggleTypes = (type) => {
    if (formData.types.includes(type)) {
      changeValue("types", formData.types.filter((t) => t !== type));
    } else {
      changeValue("types", [...formData.types, type]);
    }
  };

  return (
    <FormScreen
      heading="Choose Type"
      disabledContidion={formData.types.length === 0}
      buttonOnPress={() => router.push("locationdt")}
    >
      {types.map((type, index) => (
        <Pressable
          key={index}
          className={`px-4 mb-3 rounded-lg  border w-full ${
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
    </FormScreen>
  );
}
