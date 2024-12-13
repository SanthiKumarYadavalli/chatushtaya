import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
  Image,
} from "react-native";

import { icons } from "../constants";
import { loginUser } from "../backend/utils";
// import { images } from "../constants";
// import { getCurrentUser, signIn } from "../../lib/appwrite";
// import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  //   const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const submit = async () => {
    try {
      if (form.email === "" || form.password === "") {
        Alert.alert("Error", "Please fill in all fields");
        return;
      }
      const response = await loginUser(form);

      setSubmitting(true);
      Alert.alert("Success", "Successfully logged in");
      router.replace("/home");

      setSubmitting(false);
    } catch (e) {
      Alert.alert("Login Failed", e.message); // Show an alert on failure
    }
  };

  return (
    <SafeAreaView className="bg-mywhite h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Text
            className="text-2xl font-semibold mt-10 font-psemibold"
            style={{ color: "#FFD5C2" }}
          >
            Log in to Aora
          </Text>

          <View className={`space-y-2 mt-7`}>
            <Text className="text-base font-pmedium">Email</Text>

            <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center">
              <TextInput
                className="flex-1 text-white font-psemibold text-base"
                value={form.email}
                placeholderTextColor="#CDC1FF"
                onChangeText={(e) => setForm({ ...form, email: e })}
                keyboardType="email-address"
              />
            </View>
          </View>
          <View className={`space-y-2 mt-7`}>
            <Text className="text-base font-pmedium">Password</Text>

            <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center">
              <TextInput
                className="flex-1 text-white font-psemibold text-base"
                value={form.password}
                placeholderTextColor="#CDC1FF"
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
            className={`bg-secondary rounded-xl min-h-[62px] flex flex-row justify-center items-center mt-7 ${
              isSubmitting ? "opacity-50" : ""
            }`}
            disabled={isSubmitting}
          >
            <Text className={`text-primary font-psemibold text-lg`}>
              Sign In
            </Text>

            {isSubmitting && (
              <ActivityIndicator
                animating={isSubmitting}
                color="#fff"
                size="small"
                className="ml-2"
              />
            )}
          </TouchableOpacity>
          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/register"
              onPress={() => router.replace("/register")}
              className="text-lg font-psemibold text-secondary"
            >
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
