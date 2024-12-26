import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";
import { TextInput, TouchableOpacity } from "react-native";
import { icons } from "../constants";
import { Toast } from "toastify-react-native";
import { registerMember } from "../backend/utils";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
  });

  const submit = async () => {
    try {
      setSubmitting(true);
      const response = await registerMember(form);

      Toast.success("Sign Up successful!");

      setSubmitting(false);
      router.replace("/login");
    } catch (error) {
      Toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-4">
      <View className="flex-1 mt-5 px-4">
        <View className="flex justify-center h-full">
          <Text className="text-2xl font-semibold text-center text-gray-800">
            Sign Up 
          </Text>

          <View className={`space-y-2 mt-7`}>
            <Text className="text-base mb-3 font-medium">Email</Text>
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
            <Text className="text-base mb-3 font-medium">Username</Text>
            <View className="flex flex-row items-center border border-gray-300 h-12 px-4 rounded-2xl">
              <TextInput
                className="flex-1 text-base"
                value={form.username}
                placeholder="Enter your username"
                placeholderTextColor="#A9A9A9"
                onChangeText={(e) => setForm({ ...form, username: e })}
              />
            </View>
          </View>

          <View className={`space-y-2 mt-7`}>
            <Text className="text-base mb-3 font-medium">Password</Text>
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
            className={`bg-[#1766e4] rounded-xl min-h-[62px] flex flex-row justify-center items-center mt-7 ${
              isSubmitting ? "opacity-50" : ""
            }`}
            disabled={isSubmitting}
          >
            <Text className={`text-white font-semibold text-lg`}>Sign Up</Text>
          </TouchableOpacity>

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-600">
              Already have an account?
            </Text>
            <Link
              href="login"
              onpress={() => router.replace("/login")}
              className="text-lg font-semibold text-blue-500"
            >
              Login
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
