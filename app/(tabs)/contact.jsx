import React, { useState, useEffect } from "react";
import LoadingScreen from "../(form)/loading";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Linking,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { fetchContacts } from "../../backend/utils";

export default function Contact() {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    fetchContacts().then((data) => {
      setContacts(data);
      setLoading(false);
    });
  }, []);

  const handleLinkPress = (type, value) => {
    switch (type) {
      case "email":
        Linking.openURL(`mailto:${value}`);
        break;
      case "phone":
        Linking.openURL(`tel:${value}`);
        break;
      case "whatsapp":
        Linking.openURL(`https://wa.me/${value.replace(/\+/g, "")}`);
        break;
      default:
        break;
    }
  };
  if (loading) {
    return <LoadingScreen message="Wait a Moment..." />;
  }

  return (
    <SafeAreaView className="h-full">
      <ScrollView className="px-4 py-6 mt-12">
        <Text className="text-3xl text-center font-psemibold py-3 mb-7">
          Contact Authorities
        </Text>
        <View className="mb-32">
          {contacts.map((contact, index) => (
            <View
              key={index}
              className="bg-white p-4 rounded-lg shadow-md mb-6"
            >
              <Text className="text-xl font-pmedium mb-2">{contact.title}</Text>
              <Text className=" mb-4 font-plight">{contact.description}</Text>

              <View className="flex-row items-center mb-2">
                <FontAwesome5 name="envelope" size={16} color="#3b5be9dc" />
                <TouchableOpacity
                  onPress={() => handleLinkPress("email", contact.email)}
                >
                  <Text className="ml-2 font-pextralight">{contact.email}</Text>
                </TouchableOpacity>
              </View>

              <View className="flex-row items-center mb-2">
                <FontAwesome5 name="phone" size={16} color="#e62e59b6" />
                <TouchableOpacity
                  onPress={() => handleLinkPress("phone", contact.phoneNumber)}
                >
                  <Text className="ml-2 font-pextralight">
                    {contact.phoneNumber}
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="flex-row items-center">
                <FontAwesome5 name="whatsapp" size={18} color="green" />
                <TouchableOpacity
                  onPress={() => handleLinkPress("whatsapp", contact.whatsapp)}
                >
                  <Text className="ml-2 font-pextralight">WhatsApp</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
