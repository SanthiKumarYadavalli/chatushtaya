import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import {
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
// import { useGlobalContext } from "../context/GlobalProvider";

const Welcome = () => {
  //   const { loading, isLogged } = useGlobalContext();
  const loading = false;
  const isLogged = false;

  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <SafeAreaView className=" h-full" style = {{ backgroundColor: "#6892D5" }}>
      <View
        className="absolute flex justify-center items-center w-full h-full bg-primary/60 z-10"
        style={{
          height: 10000,
        }}
      >
        <ActivityIndicator
          animating={loading}
          color="#fff"
          size={ 50}
        />
      </View>
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center items-center h-full px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />

          <Image
            source={images.feather}
            className="max-w-[380px] w-full h-[298px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless{"\n"}
              Possibilities with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>

            <Image
              source={images.logo}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>

          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora
          </Text>

          <TouchableOpacity
            onPress={() => router.push("/login")}
            className={`bg-secondary rounded-xl min-h-[62px] flex flex-row justify-center items-center w-full mt-7 bg-mypink}`}
          >
            <Text
              className={`text-primary font-psemibold text-lg opacity-100`}
              onPress={() => router.push("/login")}
            >
              Continue with Email
            </Text>

            <ActivityIndicator
              animating={true}
              color="#fff"
              size="small"
              className="ml-2"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#79D1C3" style="light" />
    </SafeAreaView>
  );
};

export default Welcome;
