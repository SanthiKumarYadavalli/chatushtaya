import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons"; // Install: expo install @expo/vector-icons
import { logoutUser, userReportCounts } from "../backend/utils";
import { router } from "expo-router";
import { useAuthContext } from "../context/AuthProvider";
import AccountSettings from "./accountSettings";

export default function profile() {
  const { setUser, setIsLogged, user } = useAuthContext();
  const [reportCnt, setReportCnt] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReportCounts() {
      try {
        const { reportedIncidents, anonymousReports, deletedReports } = await userReportCounts(
          user.id
        );
        setReportCnt({ reportedIncidents, anonymousReports, deletedReports });
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchReportCounts();
  }, []);

  async function handleLogout() {
    try {
      await logoutUser();
      setUser(null);
      setIsLogged(false);
      router.replace("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        <TouchableOpacity onPress={() => router.back()} style={{ position: 'absolute', top: 62, left: 20 }}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        {/* Profile Header */}
        <View className="w-full flex justify-center items-center h-full px-4 my-6">
          <View className="items-center mb-6 mt-12">
            <Image
              source={{
                uri: `https://ui-avatars.com/api/?name=${user.username}&background=random`,
              }}
              className="w-32 h-32 rounded-full  mb-4"
            />
            <Text className="text-2xl font-psemibold mb-2">
              {user.username}
            </Text>
            {loading ? (
              <Text className="font-pextralight">Loading...</Text>
            ) : (
              <>
                <Text className=" mb-1 font-pextralight">
                  {reportCnt.reportedIncidents ? reportCnt.reportedIncidents : 0} Reports Filed
                </Text>
                <Text className=" mb-1 font-pextralight">
                  {reportCnt.anonymousReports ? reportCnt.anonymousReports : 0} Anonymous Reports
                </Text>
                <Text className=" mb-1 font-pextralight">
                  {reportCnt.deletedReports ? reportCnt.deletedReports : 0} Reports Deleted
                </Text>
              </>
            )}

            <Text className="font-pregular">{user.email}</Text>
            <Text className="font-pregular">{user.phoneNumber}</Text>

          </View>

          {/* Reported Incidents */}
          <View className="mb-6 w-full">
            <Text className="text-lg font-pregular mb-2">
              Reported Incidents
            </Text>
            <TouchableOpacity
              onPress={() => {
                router.push("/reports");
              }}
              className="bg-white p-4 rounded-lg shadow-md font-pregular mb-4"
            >
              <Text className="text-gray-700 text-center">
                View all {reportCnt.reportedIncidents} reports
              </Text>
            </TouchableOpacity>
          </View>

          {/* Settings Section */}
          <View className="mb-6 w-full">
            <Text className="text-lg font-pregular mb-2">Settings</Text>
            <TouchableOpacity
              onPress={() => { router.push("/accountSettings") }}
              className="flex-row items-center bg-white p-4 rounded-lg shadow-md mb-4"
            >
              <FontAwesome5 name="cogs" size={20} color="gray" />
              <Text className="ml-4 text-gray-700">Account Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleLogout}
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
