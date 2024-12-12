import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";

export default function IncidentHistoryScreen() {
  const [incidents, setIncidents] = useState([]);

  // Mock data for demonstration
  useEffect(() => {
    setIncidents([
      {
        id: "1",
        type: "Verbal Abuse",
        location: "Classroom",
        time: "10:30 AM",
        date: "2024-12-01",
        description:
          "The professor used demeaning language in front of the class.",
        status: "Reviewed",
        image: "https://via.placeholder.jpg/150",
        video: null,
      },
      {
        id: "2",
        type: "Cyber Harassment",
        location: "Online",
        time: "09:15 PM",
        date: "2024-12-05",
        description:
          "Received excessive and inappropriate messages on social media.",
        status: "Pending",
        image: null,
        video:
          "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
      },
    ]);
  }, []);

  const handleDelete = (id) => {
    Alert.alert(
      "Delete Incident",
      "Are you sure you want to delete this incident?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setIncidents((prev) =>
              prev.filter((incident) => incident.id !== id)
            );
          },
        },
      ]
    );
  };

  const renderIncidentCard = ({ item: incident }) => (
    <View
      key={incident.id}
      className="bg-white shadow-lg rounded-xl mb-6 p-6 border border-gray-200"
    >
      {/* Media Section */}
      {incident.image ? (
        <Image
          source={{ uri: incident.image }}
          className="w-full h-40 rounded-lg mb-4"
          resizeMode="cover"
          onError={(e) => {
            e.target.source = require("../assets/placeholder.jpg");
          }}
        />
      ) : incident.video ? (
        <View className="w-full h-40 mb-4 rounded-lg bg-gray-200 flex items-center justify-center">
          <Text className="text-gray-700">Video Placeholder</Text>
        </View>
      ) : (
        <Image
          source={require("../assets/placeholder.jpg")}
          className="w-full h-40 rounded-lg mb-4"
          resizeMode="cover"
        />
      )}

      {/* Content Section */}
      <View className="border-b border-gray-200 pb-4 mb-4">
        <Text className="text-xl font-bold text-blue-700">{incident.type}</Text>
        <Text className="text-gray-500 text-sm">
          {incident.date} at {incident.time}
        </Text>
      </View>
      <Text className="text-gray-700 mb-2">
        <Text className="font-semibold">Location:</Text> {incident.location}
      </Text>
      <Text className="text-gray-700 mb-4">
        <Text className="font-semibold">Description:</Text>{" "}
        {incident.description}
      </Text>
      <Text
        className={`text-sm font-medium mb-4 ${
          incident.status === "Pending" ? "text-yellow-600" : "text-green-600"
        }`}
      >
        Status: {incident.status}
      </Text>
      <TouchableOpacity
        onPress={() => handleDelete(incident.id)}
        className="bg-red-500 py-3 px-6 rounded-lg"
      >
        <Text className="text-white text-center text-sm font-medium">
          Delete
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header Section */}
      <View className="bg-gradient-to-r from-blue-500 to-blue-700 py-8 shadow-lg">
        <Text className="text-2xl font-bold text-center">Incident History</Text>
      </View>

      {/* Incident List */}
      <FlatList
        data={incidents}
        renderItem={renderIncidentCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <Text className="text-center text-gray-500 mt-4 text-lg">
            No incidents reported yet.
          </Text>
        }
      />
    </View>
  );
}
