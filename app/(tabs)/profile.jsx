import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons"; // Install: expo install @expo/vector-icons

export default function profile() {
  const [user, setUser] = useState({
    name: "Monkey D Luffy",
    email: "rr200143rguktrkv.ac.in",
    profileImage: "https://via.placeholder.com/150", // Profile image URL
    reportedIncidents: 5,
    anonymousReports: 3,
  });

  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        {/* Profile Header */}
        <View className="w-full flex justify-center items-center h-full px-4 my-6">
          <View className="items-center mb-6 mt-12">
            <Image
              source={{ uri: user.profileImage }}
              className="w-32 h-32 rounded-full border-2 border-mylavender mb-4"
            />
            <Text className="text-2xl font-bold text-blue-600 mb-2 font-pmedium">
              {user.name}
            </Text>
            <Text className=" mb-1 font-pextralight">
              {user.reportedIncidents} Reports Filed
            </Text>
            <Text className=" mb-1 font-pextralight">
              {user.anonymousReports} Anonymous Reports
            </Text>
            <Text className="font-pregular">{user.email}</Text>
          </View>

          {/* Reported Incidents */}
          <View className="mb-6 w-full">
            <Text className="text-lg font-pregular mb-2">
              Reported Incidents
            </Text>
            <TouchableOpacity
              onPress={() => {}}
              className="bg-white p-4 rounded-lg shadow-md font-pregular mb-4"
            >
              <Text className="text-gray-700 text-center">
                View all {user.reportedIncidents} reports
              </Text>
            </TouchableOpacity>
          </View>

          {/* Settings Section */}
          <View className="mb-6 w-full">
            <Text className="text-lg font-pregular mb-2">Settings</Text>
            <TouchableOpacity
              onPress={() => {}}
              className="flex-row items-center bg-white p-4 rounded-lg shadow-md mb-4"
            >
              <FontAwesome5 name="cogs" size={20} color="gray" />
              <Text className="ml-4 text-gray-700">Account Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {}}
              className="flex-row items-center bg-white p-4 rounded-lg shadow-md"
            >
              <FontAwesome5 name="sign-out-alt" size={20} color="#f72c5b" />
              <Text className="ml-4 text-[#f72c5b]">Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
