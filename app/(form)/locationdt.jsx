import React, { useState } from "react";
import { router } from "expo-router";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import FormScreen from "../../components/FormScreen";
import { useReportContext } from "../../context/ReportProvider";

export default function LocationDt() {
  const { formData, changeValue } = useReportContext();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false);
    changeValue("time", currentTime);
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    changeValue("date", selectedDate);
  };

  return (
    <FormScreen
      heading="Location and Time"
      disabledContidion={formData.location === ""}
      buttonOnPress={() => router.push("upload")}
    >
      <View className="mb-4 w-full">
        <Text className="font-pregular text-gray-800 mb-2">Location</Text>
        <TextInput
          className="px-6 py-4 mb-3 rounded-lg text-lg bg-white border border-gray-300 text-gray-800 "
          placeholder="Enter location"
          value={formData.location}
          onChangeText={(text) => changeValue("location", text)}
        />
      </View>
      <View className="mb-4 w-full">
        <Text className="font-pregular text-gray-800 mb-2">Time</Text>
        <TouchableOpacity
          className="px-6 py-5 mb-3 text-lg font-plight bg-white border border-gray-300 rounded-lg"
          onPress={() => setShowTimePicker(true)}
        >
          <Text className="text-gray-800">
            {formData.time.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={formData.time}
            mode="time"
            is24Hour={false}
            display="default"
            onChange={onTimeChange}
          />
        )}
      </View>
      <View className="mb-4 w-full">
        <Text className="font-pregular text-gray-800 mb-2">Date</Text>
        <TouchableOpacity
          className="py-5 px-5 bg-white text-lg font-plight border border-gray-300 rounded-lg w-full"
          onPress={() => setShowDatePicker(true)}
        >
          <Text className="text-gray-800">
            {formData.date.toLocaleDateString([], {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={formData.date}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
      </View>
    </FormScreen>
  );
}
