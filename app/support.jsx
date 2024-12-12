import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  ScrollView,
} from "react-native";

export default function SupportResourcesScreen() {
  const resources = [
    {
      title: "University Helpline",
      description:
        "Contact the university grievance cell for immediate assistance.",
      link: "tel:+1234567890",
      type: "phone",
      image: require("../assets/helpline.png"),
    },
    {
      title: "Counseling Services",
      description: "Reach out to our dedicated counseling team.",
      link: "https://university-counseling.example.com",
      type: "web",
      image: require("../assets/counseling.png"),
    },
    {
      title: "National Helpline",
      description: "Dial the national helpline for harassment-related issues.",
      link: "tel:+18001234567",
      type: "phone",
      image: require("../assets/national-helpline.png"),
    },
    {
      title: "Support FAQ",
      description: "Learn how to handle harassment incidents effectively.",
      link: "https://support-faq.example.com",
      type: "web",
      image: require("../assets/faq.png"),
    },
  ];

  const handlePress = (link) => {
    try {
      Linking.openURL(link);
    } catch (error) {
      console.error("Error opening link:", error);
    }
  };

  return (
    <View className="flex-1 bg-gray-50 p-6">
      {/* Header */}

      {/* ScrollView for resource cards */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-8">
          <Text className="text-3xl font-extrabold text-blue-600 text-center">
            Support Resources
          </Text>
          <Text className="text-gray-500 text-center mt-2">
            Access resources to help you handle harassment incidents.
          </Text>
        </View>
        <View className="space-y-6">
          {resources.map((resource, index) => (
            <View
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden mb-3"
            >
              {/* Image */}
              <Image
                source={resource.image}
                className="w-full h-48"
                resizeMode="cover"
              />
              {/* Content */}
              <View className="p-4">
                <Text className="text-xl font-bold text-gray-800 mb-2">
                  {resource.title}
                </Text>
                <Text className="text-gray-600 mb-4">
                  {resource.description}
                </Text>
                <TouchableOpacity
                  onPress={() => handlePress(resource.link)}
                  className="bg-blue-600 py-3 rounded-md"
                >
                  <Text className="text-white text-center text-lg font-medium">
                    {resource.type === "phone" ? "Call Now" : "Visit Website"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
