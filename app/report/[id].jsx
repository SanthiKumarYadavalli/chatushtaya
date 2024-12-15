// Function to fetch a single report by ID

import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, Image } from 'react-native';
import { Button, Card, Text, Divider } from 'react-native-paper';

import { router, useLocalSearchParams } from "expo-router";
import { deleteReport, fetchSingleReport, updateReport } from "../../backend/utils";
import LoadingScreen from "../(form)/loading";
import {Toast} from "toastify-react-native";

const SingleReport = () => {
  const { id } = useLocalSearchParams(); // Get the report ID from the route params
  const [report, setReport] = useState(null); // State for storing the report data
  const [loading, setLoading] = useState(true); // State for managing loading status
  const [canReport, setCanReport] = useState(0);
  console.log(id);
  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        const fetchedReport = await fetchSingleReport(id);
        if (fetchedReport) {
          setReport(fetchedReport);
          // Check if the time difference between the current date and report's date is more than 7 days
          const reportDate = new Date(fetchedReport.date?.seconds * 1000);
          const currentDate = new Date();
          const diffTime = Math.abs(currentDate - reportDate);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert time difference to days

          if (diffDays > 7) {
            setCanReport(true); // Enable the "Report to SuperAdmin" button if the difference is greater than 7 days
          }
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
    isSuperReport=false,
  } = report || {};

  const formattedDate = new Date(date?.seconds * 1000).toLocaleString();
  const formattedTime = new Date(time?.seconds * 1000).toLocaleTimeString();

  if (loading) {
    return (
      <LoadingScreen />
    );
  }

  const handleDelete =()=>{
    deleteReport(id);
    router.replace("reports");
    Toast.success("Report Deleted Successfully");
  }

  const handleSuperReport = ()=>{
    const updatedReport = {
      ...report,
      isSuperReport:true,
    }
    updateReport(id,updatedReport);
    setReport(updatedReport);
    router.replace("reports");
    Toast.success("Reported to Super-Admin");
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f4f4f4' }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 16,
        }}
      >
        {/* Header Section */}
        <View style={{ paddingVertical: 20 }}>
          <Text style={{ fontWeight: 'bold', textAlign: 'center', color: '#2E3A59' }}>
            Report Details
          </Text>
        </View>

        {/* Report Content */}
        <Card style={{ width: '100%', padding: 16, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, elevation: 5 }}>
          {/* Status */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <Text  style={{ fontWeight: '600' }}>Status:</Text>
            <Text
              style={{
                fontWeight: '600',
                color: status === 'unreviewed' ? '#E53935' : '#43A047',
                marginLeft: 8,
              }}
            >
              {status}
            </Text>
          </View>

          {/* User Info */}
          <View style={{ marginBottom: 16 }}>
            <Text style={{ color: '#6c6c6c' }}>
              <Text style={{ fontWeight: '600' }}>User ID: </Text>
              {isAnonymous ? 'Anonymous' : userId}
            </Text>
          </View>

          {/* Harasser Details */}
          {harasserDetails && (
            <View style={{ marginBottom: 16 }}>
              <Text style={{ color: '#6c6c6c' }}>
                <Text style={{ fontWeight: '600' }}>Harasser Details: </Text>
                {harasserDetails}
              </Text>
            </View>
          )}

          {/* Location */}
          <View style={{ marginBottom: 16 }}>
            <Text style={{ color: '#6c6c6c' }}>
              <Text style={{ fontWeight: '600' }}>Location: </Text>
              {location}
            </Text>
          </View>

          {/*superReport */}
          <View style={{ marginBottom: 16 }}>
            <Text style={{ color: '#6c6c6c' }}>
              <Text style={{ fontWeight: '600' }}>Super Report: </Text>
              {isSuperReport?"true":"false"}
            </Text>
          </View>

          {/* Types */}
          <View style={{ marginBottom: 16 }}>
            <Text style={{ color: '#6c6c6c' }}>
              <Text style={{ fontWeight: '600' }}>Type(s): </Text>
              {types.join(', ')}
            </Text>
          </View>

          {/* Date & Time */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
            <Text style={{ color: '#6c6c6c' }}>
              <Text style={{ fontWeight: '600' }}>Date: </Text>
              {formattedDate}
            </Text>
            <Text  style={{ color: '#6c6c6c' }}>
              <Text style={{ fontWeight: '600' }}>Time: </Text>
              {formattedTime}
            </Text>
          </View>

          {/* Additional Info */}
          {additionalInfo && (
            <View style={{ marginBottom: 16 }}>
              <Text  style={{ color: '#6c6c6c' }}>
                <Text style={{ fontWeight: '600' }}>Additional Info: </Text>
                {additionalInfo}
              </Text>
            </View>
          )}

          {/* Evidence */}
          <View style={{ marginBottom: 16 }}>
            <Text  style={{ fontWeight: '600', color: '#2E3A59' }}>Evidence:</Text>
            {evidence.length > 0 ? (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {evidence.map((url, index) => (
                  <Image
                    key={index}
                    source={{ uri: url }}
                    style={{ width: 150, height: 150, borderRadius: 12, marginRight: 12 }}
                    resizeMode="cover"
                  />
                ))}
              </ScrollView>
            ) : (
              <Text  style={{ color: '#9E9E9E' }}>
                No evidence provided.
              </Text>
            )}
          </View>
        </Card>

        {/* Divider */}
        <Divider style={{ width: '100%', marginVertical: 24 }} />

        {/* Action Buttons */}
        <View style={{ width: '100%', paddingHorizontal: 16 }}>
          {/* Delete Button */}
          <Button
            mode="contained"
            style={{ marginBottom: 12, backgroundColor: "#E53935" }}
            onPress={handleDelete}
          >
            Delete
          </Button>

          {/* Report to SuperAdmin Button (Enabled if more than 7 days) */}
          <Button
            mode="contained"
            style={{
              marginBottom: 12,
              backgroundColor:(canReport && !isSuperReport)?"#FFB300":"gray",
            }}
            onPress={handleSuperReport}
            disabled={isSuperReport || !canReport} // Disable if time difference is less than 7 days
          >
            Report to SuperAdmin
          </Button>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SingleReport;
