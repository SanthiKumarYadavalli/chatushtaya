import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { fetchReportsByUserId } from "../../backend/utils"; // Adjust the path as necessary
import { useAuthContext } from "../../context/AuthProvider";
import LoadingScreen from "../(form)/loading";

export default function ReportsScreen() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const { user } = useAuthContext();

  if (!user) {
    return <Login />;
  }

  useEffect(() => {
    fetchReportsByUserId(user.id)
      .then((data) => {
        setReports(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch reports.");
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <View>
        <Text>{error}</Text>
      </View>
    );
  }

  // Function to format Firebase Timestamp to a readable date string
  const formatTimestamp = (timestamp) => {
    if (timestamp && timestamp.toDate) {
      const date = timestamp.toDate(); // Converts Firebase timestamp to JavaScript Date
      return date.toLocaleString(); // You can customize this formatting
    }
    return "N/A"; // Return "N/A" if no valid timestamp
  };

  // If no report is selected, show the list of reports
  if (!selectedReport) {
    const sortedReports = reports.sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
      <SafeAreaView className="h-full">
        <ScrollView className="px-4 py-6 mt-12 mb-32">
          <Text className="text-3xl text-center font-psemibold py-3 mb-7">
            Reports History
          </Text>
          <View className="flex-1 p-3 mt-2 mb-32">
            {reports.length === 0 ? (
              <Text className="text-lg text-gray-500 text-center mt-5">
                No reports available.
              </Text>
            ) : (
              sortedReports.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedReport(item)} // When clicked, set the selected report
                  className="flex"
                >
                  <View className="bg-white p-4 rounded-lg mb-4 shadow-lg border border-gray-300">
                    <Text className="text-xl font-semibold text-gray-800">
                      {`Report ${sortedReports.length - index}`}
                    </Text>
                    <Text className="text-md font-medium text-gray-700">
                      {item.types.join(", ")}
                    </Text>
                    <Text className="text-sm text-gray-600 mt-1">
                      {`Location: ${item.location}`}
                    </Text>
                    <Text className="text-sm text-gray-600 mt-1 text-gray-400">
                      {`Status: ${item.status}`}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
  setSelectedReport(null);
}
