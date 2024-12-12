import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons"; // Install: expo install @expo/vector-icons

export default function ProfileScreen() {
  const [user, setUser] = useState({
    name: "Jane Doe",
    bio: "Student at XYZ University. Advocating for safety and respect.",
    profileImage: "https://via.placeholder.com/150", // Profile image URL
    reportedIncidents: 5,
    anonymousReports: 3,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newBio, setNewBio] = useState(user.bio);

  const handleSaveBio = () => {
    setUser({ ...user, bio: newBio });
    setIsEditing(false);
  };

  return (
    <ScrollView className="flex-1 bg-gray-100 p-6">
      {/* Profile Header */}
      <View className="flex-row items-center mb-6">
        <Image
          source={{ uri: user.profileImage }}
          className="w-24 h-24 rounded-full border-4 border-blue-500 mr-4"
        />
        <View>
          <Text className="text-2xl font-bold text-blue-600">{user.name}</Text>
          <Text className="text-gray-500">
            {user.reportedIncidents} Reports Filed
          </Text>
          <Text className="text-gray-500">
            {user.anonymousReports} Anonymous Reports
          </Text>
        </View>
      </View>

      {/* Bio Section */}
      <View className="mb-6">
        <Text className="text-lg font-medium text-gray-700 mb-2">Bio</Text>
        {isEditing ? (
          <TextInput
            value={newBio}
            onChangeText={setNewBio}
            className="bg-white p-4 rounded-lg border border-gray-300"
            multiline
            numberOfLines={4}
          />
        ) : (
          <Text className="text-gray-700">{user.bio}</Text>
        )}
      </View>

      {/* Edit Button */}
      <TouchableOpacity
        onPress={() => setIsEditing(!isEditing)}
        className="bg-blue-500 py-3 px-6 rounded-lg mb-6"
      >
        <Text className="text-white text-lg text-center">
          {isEditing ? "Save Bio" : "Edit Bio"}
        </Text>
      </TouchableOpacity>

      {/* Reported Incidents */}
      <View className="mb-6">
        <Text className="text-lg font-medium text-gray-700 mb-2">
          Reported Incidents
        </Text>
        <TouchableOpacity
          onPress={() => {}}
          className="bg-white p-4 rounded-lg shadow-md mb-4"
        >
          <Text className="text-gray-700">
            View all {user.reportedIncidents} reports
          </Text>
        </TouchableOpacity>
      </View>

      {/* Settings Section */}
      <View className="mb-6">
        <Text className="text-lg font-medium text-gray-700 mb-2">Settings</Text>
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
          <FontAwesome5 name="sign-out-alt" size={20} color="gray" />
          <Text className="ml-4 text-gray-700">Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
