import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker"; // Install: npm install @react-native-picker/picker
import DateTimePicker from "@react-native-community/datetimepicker"; // Install: npm install @react-native-community/datetimepicker
import * as ImagePicker from "expo-image-picker"; // Install: expo install expo-image-picker

export default function IncidentReportingScreen() {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [customType, setCustomType] = useState("");
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedVideo, setUploadedVideo] = useState(null);

  const toggleAnonymous = () => setIsAnonymous(!isAnonymous);

  const handleTimeChange = (event, selectedDate) => {
    setShowTimePicker(false);
    if (selectedDate) setTime(selectedDate);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setUploadedImage(result.assets[0].uri);
    }
  };

  const pickVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      quality: 1,
    });

    if (!result.canceled) {
      setUploadedVideo(result.assets[0].uri);
    }
  };

  return (
    <View className="flex-1 bg-white p-6">
      {/* Header */}
      <Text className="text-2xl font-bold text-blue-600 mb-4 text-center">
        Report an Incident
      </Text>
      <Text className="text-gray-500 mb-6 text-center">
        Fill in the required details below. Your privacy is our priority.
      </Text>

      {/* Harassment Type Dropdown */}
      <Text className="text-lg font-medium text-gray-700 mb-2">Type *</Text>
      <View className="bg-gray-100 rounded-lg mb-4 w-full">
        <Picker
          selectedValue={selectedType}
          onValueChange={(itemValue) => setSelectedType(itemValue)}
          style={{ height: 50 }}
        >
          <Picker.Item label="Select Type" value="" />
          <Picker.Item label="Verbal Abuse" value="verbal" />
          <Picker.Item label="Sexual Harassment" value="sexual" />
          <Picker.Item label="Bullying" value="bullying" />
          <Picker.Item label="Stalking" value="stalking" />
          <Picker.Item label="Cyber Harassment" value="cyber" />
          <Picker.Item label="Discrimination" value="discrimination" />
          <Picker.Item label="Others" value="others" />
        </Picker>
      </View>

      {/* Custom Type Field */}
      {selectedType === "others" && (
        <View className="mb-4">
          <Text className="text-lg font-medium text-gray-700 mb-2">
            Specify Type
          </Text>
          <TextInput
            placeholder="Enter type of harassment"
            className="bg-gray-100 p-4 rounded-lg w-full"
            value={customType}
            onChangeText={setCustomType}
          />
        </View>
      )}

      {/* Location */}
      <Text className="text-lg font-medium text-gray-700 mb-2">Location *</Text>
      <TextInput
        placeholder="Enter location (e.g., Classroom, Library)"
        className="bg-gray-100 p-4 rounded-lg mb-4 w-full"
      />

      {/* Time Picker */}
      <Text className="text-lg font-medium text-gray-700 mb-2">Time *</Text>
      <TouchableOpacity
        onPress={() => setShowTimePicker(true)}
        className="bg-gray-100 p-4 rounded-lg mb-4 w-full"
      >
        <Text className="text-gray-600">
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          is24Hour={false}
          display="default"
          onChange={handleTimeChange}
        />
      )}

      {/* Additional Details */}
      <Text className="text-lg font-medium text-gray-700 mb-2">Details</Text>
      <TextInput
        placeholder="Optional: Provide more details"
        className="bg-gray-100 p-4 rounded-lg mb-6 w-full"
        multiline
        numberOfLines={4}
      />

      {/* Upload Photos or Videos */}
      <Text className="text-lg font-medium text-gray-700 mb-2">
        Attachments (Optional)
      </Text>
      <View className="flex-row justify-between mb-4">
        <TouchableOpacity
          onPress={pickImage}
          className="bg-gray-200 py-3 px-4 rounded-lg"
        >
          <Text className="text-blue-500">Upload Image</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={pickVideo}
          className="bg-gray-200 py-3 px-4 rounded-lg"
        >
          <Text className="text-blue-500">Upload Video</Text>
        </TouchableOpacity>
      </View>

      {/* Display Uploaded Media */}
      {uploadedImage && (
        <View className="mb-4">
          <Text className="text-gray-700 mb-2">Uploaded Image:</Text>
          <Image
            source={{ uri: uploadedImage }}
            className="w-full h-40 rounded-lg"
            resizeMode="cover"
          />
        </View>
      )}
      {uploadedVideo && (
        <View className="mb-4">
          <Text className="text-gray-700 mb-2">Uploaded Video:</Text>
          <Text className="text-gray-600">{uploadedVideo}</Text>
        </View>
      )}

      {/* Anonymous Reporting Toggle */}
      <View className="flex-row items-center justify-between mb-6 w-full">
        <Text className="text-lg font-medium text-gray-700">
          Report Anonymously
        </Text>
        <Switch
          value={isAnonymous}
          onValueChange={toggleAnonymous}
          trackColor={{ false: "#ccc", true: "#4caf50" }}
          thumbColor={isAnonymous ? "#4caf50" : "#f4f3f4"}
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity className="bg-blue-500 py-4 rounded-lg w-full">
        <Text className="text-white text-center text-lg font-medium">
          Submit Report
        </Text>
      </TouchableOpacity>
    </View>
  );
}
