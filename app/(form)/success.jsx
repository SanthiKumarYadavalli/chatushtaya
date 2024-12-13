import React from "react";
import { Image, Text, View } from "react-native";
import { router } from "expo-router";
import FormContainer from "../../components/FormContainer";
import InputsContainer from "../../components/InputsContainer";
import NextButton from "../../components/NextButton";
import { useReportContext } from "../../context/ReportProvider";

export default function SuccessScreen() {
  const { formData } = useReportContext();
  return (
    <FormContainer>
      <InputsContainer>
        <Image
          source={require("../../assets/images/submitted.png")}
          resizeMode="contain"
          className="w-52 h-52"
        />
        <Text className="text-center text-2xl font-pbold mt-5">
          We have received your submission!
        </Text>
        {/* <View>
          <Text>{JSON.stringify(formData)}</Text>
        </View> */}
      </InputsContainer>
      <NextButton disabledContidion={false} onPress={() => router.replace("/home")} text="Go Home" />
    </FormContainer>
  );
}
