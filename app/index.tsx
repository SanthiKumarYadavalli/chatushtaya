import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-white items-center justify-center p-4">
      {/* App Title */}
      <Text className="text-3xl font-bold text-blue-600">Safe Campus</Text>
      <Text className="text-lg text-gray-500 mt-2 text-center">
        Empowering students with safety and support
      </Text>

      {/* Navigation Buttons */}
      <View className="mt-6 w-full">
        <TouchableOpacity
          className="bg-blue-500 py-4 rounded-lg mb-4 shadow-md"
          onPress={() => router.push("/report")}
        >
          <Text className="text-white text-center text-lg font-medium">
            Report an Incident
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-green-500 py-4 rounded-lg mb-4 shadow-md"
          onPress={() => router.push("/support")}
        >
          <Text className="text-white text-center text-lg font-medium">
            View Resources
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-yellow-500 py-4 rounded-lg mb-4 shadow-md"
          onPress={() => router.push("/history")}
        >
          <Text className="text-white text-center text-lg font-medium">
            Incident History
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-gray-500 py-4 rounded-lg shadow-md"
          onPress={() => router.push("/profile")}
        >
          <Text className="text-white text-center text-lg font-medium">
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
