import { Text, View, ActivityIndicator } from "react-native";
import React from "react";
import FormContainer from "../../components/FormContainer";

const LoadingScreen = ({ message }) => {
  return (
    <FormContainer>
      <View className="flex items-center justify-center h-full gap-2">
        <ActivityIndicator size="large" color="#6892D5" />
        <Text className="text-xl text-gray-800 font-pmedium">{message}</Text>
      </View>
    </FormContainer>
  );
};

export default LoadingScreen;
