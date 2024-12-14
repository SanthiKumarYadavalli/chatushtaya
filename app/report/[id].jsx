// Function to fetch a single report by ID

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";

import { useLocalSearchParams } from "expo-router";
import { fetchSingleReport } from "../../backend/utils";

const SingleReport = () => {
  const { id } = useLocalSearchParams(); // Get the report ID from the route params
  const [report, setReport] = useState(null); // State for storing the report data
  const [loading, setLoading] = useState(true); // State for managing loading status
  console.log(report);
  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        const fetchedReport = await fetchSingleReport(id);
        if (fetchedReport) {
          setReport(fetchedReport);
        }
      } catch (err) {
        console.error("Error fetching report:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  const {
    additionalInfo = null,
    date = null,
    evidence = [],
    harasserDetails = null,
    isAnonymous = false,
    location = null,
    status = "unreviewed",
    time = null,
    types = [],
    userId = null,
  } = report || {};

  const formattedDate = new Date(date?.seconds * 1000).toLocaleString();
  const formattedTime = new Date(time?.seconds * 1000).toLocaleTimeString();

  if (loading) {
    return (
      <SafeAreaView className="bg-primary h-full flex justify-center items-center">
        <ActivityIndicator size="large" color="#ffffff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-primary flex-1">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        className="px-4 py-8"
      >
        {/* Header Section */}
        <View className="px-5">
          <Text className="text-4xl font-extrabold mb-8 text-center text-secondary">
            Report Details
          </Text>

          {/* Report Content */}
          <View className="bg-white p-6 h-[80vh] rounded-2xl shadow-lg w-full ">
            {/* Status */}
            <View className="">
              <View className="flex flex-row justify-start gap-3 items-center mb-4">
                <Text className="text-lg font-semibold">Status:</Text>
                <Text
                  className={`text-lg font-semibold ${
                    status === "unreviewed" ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {status}
                </Text>
              </View>

              {/* User Info */}
              <View className="mb-4">
                <Text className="text-gray-700 text-base">
                  <Text className="font-semibold">User ID: </Text>
                  {isAnonymous ? "Anonymous" : userId}
                </Text>
              </View>

              {/* Harasser Details (Optional) */}
              {harasserDetails && (
                <View className="mb-4">
                  <Text className="text-gray-700 text-base">
                    <Text className="font-semibold">Harasser Details: </Text>
                    {harasserDetails}
                  </Text>
                </View>
              )}

              {/* Location */}
              <View className="mb-4">
                <Text className="text-gray-700 text-base">
                  <Text className="font-semibold">Location: </Text>
                  {location}
                </Text>
              </View>

              {/* Types */}
              <View className="mb-4">
                <Text className="text-gray-700 text-base">
                  <Text className="font-semibold">Type(s): </Text>
                  {types.join(", ")}
                </Text>
              </View>

              {/* Date & Time */}
              <View className="flex gap-4 justify-between mb-4">
                <Text className="text-gray-700 text-base">
                  <Text className="font-semibold">Date: </Text>
                  {formattedDate}
                </Text>
                <Text className="text-gray-700 text-base">
                  <Text className="font-semibold">Time: </Text>
                  {formattedTime}
                </Text>
              </View>

              {/* Additional Info (Optional) */}
              {additionalInfo && (
                <View className="mb-4">
                  <Text className="text-gray-700 text-base">
                    <Text className="font-semibold">Additional Info: </Text>
                    {additionalInfo}
                  </Text>
                </View>
              )}

              {/* Evidence */}
              <View className="mb-4">
                <Text className="font-semibold text-gray-700 text-base mb-2">
                  Evidence:
                </Text>
                {evidence.length > 0 ? (
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  >
                    {evidence.map((url, index) => (
                      <Image
                        key={index}
                        source={{ uri: url }}
                        className="w-72 h-72 mr-4 rounded-lg"
                        resizeMode="cover"
                      />
                    ))}
                  </ScrollView>
                ) : (
                  <Text className="text-gray-500 text-sm">
                    No evidence provided.
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SingleReport;
