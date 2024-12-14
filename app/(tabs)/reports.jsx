import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { fetchReportsByUserId } from "../../backend/utils"; // Adjust the path as necessary
import { useAuthContext } from "../../context/AuthProvider";

export default function ReportsScreen() {
  // const [reports, setReports] = useState([]);
  const reports = [
    {
      additionalInfo: "Devil1",
      date: "14 December 2024 at 12:02:20 UTC+5:30",
      evidence: [
        "https://res.cloudinary.com/dgt35afpc/image/upload/v1734157993/mf1krqjpp8fxc4u2zkpb.jpg"
      ],
      harasserDetails: "Devil",
      isAnonymous: false,
      location: "Library",
      status: "unreviewed",
      time: "14 December 2024 at 12:02:20 UTC+5:30",
      types: "Cyber harassment"
    },
    {
      additionalInfo: "Devil2",
      date: "14 December 2024 at 12:05:00 UTC+5:30",
      evidence: [
        "https://res.cloudinary.com/dgt35afpc/image/upload/v1734157993/mf1krqjpp8fxc4u2zkpb.jpg"
      ],
      harasserDetails: "Devil",
      isAnonymous: false,
      location: "Cafeteria",
      status: "reviewed",
      time: "14 December 2024 at 12:05:00 UTC+5:30",
      types: "Cyber harassment"
    },
    {
      additionalInfo: "Anonymous Report",
      date: "14 December 2024 at 12:10:00 UTC+5:30",
      evidence: [
        "https://res.cloudinary.com/dgt35afpc/image/upload/v1734157993/mf1krqjpp8fxc4u2zkpb.jpg"
      ],
      harasserDetails: "Unknown",
      isAnonymous: true,
      location: "Online",
      status: "unreviewed",
      time: "14 December 2024 at 12:10:00 UTC+5:30",
      types: "Cyber bullying"
    },
    {
      additionalInfo: "Devil3",
      date: "14 December 2024 at 12:15:00 UTC+5:30",
      evidence: [
        "https://res.cloudinary.com/dgt35afpc/image/upload/v1734157993/mf1krqjpp8fxc4u2zkpb.jpg"
      ],
      harasserDetails: "Devil",
      isAnonymous: false,
      location: "Library",
      status: "unreviewed",
      time: "14 December 2024 at 12:15:00 UTC+5:30",
      types: "Physical harassment"
    }
  ];
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useAuthContext();
  if (!user) {
    return <Login />;
  }
  // useEffect(() => {
  //   fetchReportsByUserId(user.email).then((data) => {
  //     setReports(data);
  //     setLoading(false);
  //   });
  // }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }
  // Render each report item
  const sortedReports = reports.sort((a, b) => new Date(b.date) - new Date(a.date));
  return (
    <View className='flex-1 p-5 bg-gray-50'>
        {reports.length === 0 ? (
          <Text className='text-lg text-gray-500 text-center mt-5'>No reports available.</Text>
        ) : (
          sortedReports.map((item, index) => (
            <TouchableOpacity>
              <View key={index} className='bg-white p-4 rounded-lg mb-4 shadow-lg border border-gray-300'>
                <Text className='text-xl font-semibold text-gray-800'>{`Report ${sortedReports.length-index}`}</Text>
                <Text className='text-md font-medium text-gray-700'>{item.types.join(', ')}</Text>
                <Text className='text-sm text-gray-600 mt-1'>{`Location: ${item.location}`}</Text>
                <Text className='text-sm text-gray-600 mt-1'>{`Date: ${new Date(item.date).toLocaleDateString()} Time: ${new Date(item.time).toLocaleTimeString()}`}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>
  );
}
