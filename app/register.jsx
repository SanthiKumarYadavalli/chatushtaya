import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";
import { TextInput, TouchableOpacity } from "react-native";
import { icons } from "../constants";

import { registerUser } from "../backend/functions";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    } else {
      setSubmitting(true);
      const response = await registerUser(form);
      if (!response.success) {
        Alert.alert("Sign Up Failed", response.message);
        return;
      }
      router.replace("/home");
    }
    setSubmitting(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-4">
      <View className="flex items-center">
            <Image
                source={require("../assets/images/register.png")} // Image for login
                className="w-42 h-52 mt-8 mb-5"
                resizeMode="contain"
            />
        </View>

      <View className="flex-1 mt-5">
        <View className="flex justify-center h-full">
          <Text className="text-2xl font-semibold text-center text-gray-800">Sign Up to Chatushtaya</Text>

          <View className={`space-y-2 mt-7`}>
            <Text className="text-base font-medium">Email</Text>
            <TextInput
              className="border border-gray-300 h-12 px-4 rounded-2xl"
              value={form.email}
              placeholder="Enter your email"
              placeholderTextColor="#A9A9A9"
              onChangeText={(e) => setForm({ ...form, email: e })}
              keyboardType="email-address"
            />
          </View>

          <View className={`space-y-2 mt-7`}>
            <Text className="text-base font-medium">Password</Text>
            <View className="flex flex-row items-center border border-gray-300 h-12 px-4 rounded-2xl">
              <TextInput
                className="flex-1 text-base"
                value={form.password}
                placeholder="Enter your password"
                placeholderTextColor="#A9A9A9"
                onChangeText={(e) => setForm({ ...form, password: e })}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Image
                  source={!showPassword ? icons.eye : icons.eyeHide}
                  className="w-6 h-6"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={submit}
            activeOpacity={0.7}
            className={`bg-blue-500 rounded-xl min-h-[62px] flex flex-row justify-center items-center mt-7 ${
              isSubmitting ? "opacity-50" : ""
            }`}
            disabled={isSubmitting}
          >
            <Text className={`text-white font-semibold text-lg`}>Sign Up</Text>
          </TouchableOpacity>

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-600">Already have an account?</Text>
            <Link href="login" onpress={() => router.replace("/login")} className="text-lg font-semibold text-blue-500">
              Login
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;