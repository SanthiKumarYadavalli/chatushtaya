import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";
import { TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { icons } from "../constants";
// import { images } from "../../constants";
// import { createUser } from "../../lib/appwrite";
// import { CustomButton, FormField } from "../../components";
// import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {
//   const { setUser, setIsLogged } = useGlobalContext();
    
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }else{
      setSubmitting(true);
      Alert.alert("Success", "Successfully logged in");
      router.replace("/index");
    }
    // try {
    //   const result = await createUser(form.email, form.password, form.username);
    //   setUser(result);
    //   setIsLogged(true);

    //   router.replace("/home");
    // } catch (error) {
    //   Alert.alert("Error", error.message);
    // } finally {
    //   setSubmitting(false);
    // }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >

          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Sign Up to Chatustaya
          </Text>

          
          <View className={`space-y-2 mt-7`}>
            <Text className="text-base text-gray-100 font-pmedium">
              Username
            </Text>

            <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center">
              <TextInput
                className="flex-1 text-white font-psemibold text-base"
                value={form.username}
                placeholderTextColor="#7B7B8B"
                onChangeText={(e) => setForm({ ...form, username: e })}
              />
            </View>
          </View>
          <View className={`space-y-2 mt-7`}>
            <Text className="text-base text-gray-100 font-pmedium">
              Email
            </Text>

            <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center">
              <TextInput
                className="flex-1 text-white font-psemibold text-base"
                value={form.email}
                placeholderTextColor="#7B7B8B"
                keyboardType="email-address"
                onChangeText={(e) => setForm({ ...form, email: e })}
              />
            </View>
          </View>
          <View className={`space-y-2 mt-7`}>
            <Text className="text-base text-gray-100 font-pmedium">
              Password
            </Text>

            <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center">
              <TextInput
                className="flex-1 text-white font-psemibold text-base"
                value={form.password}
                placeholderTextColor="#7B7B8B"
                onChangeText={(e) => setForm({ ...form, password: e })}
                secureTextEntry={!showPassword}
              />

                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
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
            className={`bg-secondary rounded-xl min-h-[62px] flex flex-row justify-center items-center mt-7${
              isSubmitting ? "opacity-50" : ""
            }`}
            disabled={isSubmitting}
          >
            <Text className={`text-primary font-psemibold text-lg `}>
              Sign Up
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
              Have an account already?
            </Text>
            <Link
              href="/login"
              onPress={() => router.replace("/login")}
              className="text-lg font-psemibold text-secondary"
            >
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
