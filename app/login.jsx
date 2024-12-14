import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { loginUser } from "../backend/utils";
import { Toast } from "toastify-react-native";
import LoadingScreen from "./(form)/loading";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { icons } from "../constants";

import { useAuthContext } from "../context/AuthProvider";
const SignIn = () => {
  const { setUser, setIsLogged } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  if(loading){
    return <LoadingScreen />
  }

  const submit = async () => {
    setLoading(true);
    try {
      if (form.email === "" || form.password === "") {
        Alert.alert("Error", "Please fill in all fields");
        return;
      }
      const response = await loginUser(form);
      setUser(response);
      setIsLogged(true);
      setSubmitting(true);
      Toast.success("Successfully logged in");
      router.replace("/home");
      setSubmitting(false);
    } catch (e) {
      Toast.error("Error logging in", e.message);
    }finally{
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-4">
      <View className="flex items-center">
        <Image
          source={require("../assets/images/signin.png")} // Image for login
          className="w-42 h-52 mt-8 mb-5"
          resizeMode="contain"
        />
      </View>
      <View className="flex-1  position-absolute">
        <View className="flex justify-center h-full">
          <Text className="text-2xl font-semibold text-center text-gray-800">
            Log in to Chatushtaya
          </Text>
          <View className="space-y-2 mt-7">
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

          <View className="space-y-2 mt-7">
            <Text className="text-base font-medium">Password</Text>
            <View className="flex flex-row items-center border border-gray-300 h-12 px-4 rounded-2xl">
              <TextInput
                className="flex-1 text-base h-12"
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
            <Text className={`text-white font-semibold text-lg`}>Sign In</Text>
          </TouchableOpacity>

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-600">
              Don't have an account?
            </Text>
            <Link
              href="register"
              onpress={() => router.replace("/register")}
              className="text-lg font-semibold text-blue-500"
            >
              Signup
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
