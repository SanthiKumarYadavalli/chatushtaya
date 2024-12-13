import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import FormScreen from "../components/FormScreen";
import * as ImagePicker from "expo-image-picker";

const ChooseTypeScreen = () => {
  const [step, setStep] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [formData, setFormData] = useState({
    types: [],
    date: new Date(),
    time: new Date(),
    location: "",
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsMultipleSelection: true,

    });
    if (!result.canceled) {
      setFormData((prev) => ({ ...prev, uploadedImage: result.assets[0].uri }));
    }
  };


  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false);
    setFormData({ ...formData, time: currentTime });
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    setFormData({ ...formData, date: selectedDate });
  };

  const types = [
    "Verbal Abuse",
    "Sexual Harassment",
    "Bullying",
    "Stalking",
    "Cyber harassment",
    "Discrimination",
    "Abuse of Authority by Staff or Faculty",
  ];

  const toggleTypes = (type) => {
    if (formData.types.includes(type)) {
      setFormData({
        ...formData,
        types: formData.types.filter((t) => t !== type),
      });
    } else {
      setFormData({ ...formData, types: [...formData.types, type] });
    }
  };
  switch (step) {
    case 0:
      return (
        <FormScreen heading="Choose Type" disabledContidion={formData.types.length === 0} setStep={setStep}>
            {types.map((type, index) => (
              <Pressable
                key={index}
                className={`px-4 mb-3 rounded-lg  border w-full transition-all duration-500 ${
                  formData.types.includes(type)
                    ? "bg-mypink border-transparent"
                    : "bg-white border-gray-300"
                }`}
                style={{ paddingVertical: 15 }}
                onPress={() => toggleTypes(type)}
              >
                <Text
                  className={`font-plight ${
                    formData.types.includes(type)
                      ? "text-white"
                      : "text-grey-600"
                  }`}
                >
                  {type}
                </Text>
              </Pressable>
            ))}
        </FormScreen>
      );
    case 1:
      return (
        <FormScreen heading="Location and Time" disabledContidion={formData.location === ""} setStep={setStep}>
            <View className="mb-4 w-full">
              <Text className="font-pregular text-gray-800 mb-2">
                Location
              </Text>
              <TextInput
                className="px-6 py-4 mb-3 rounded-lg text-lg bg-white border border-gray-300 text-gray-800 "
                placeholder="Enter location"
                value={formData.location}
                onChangeText={(text) =>
                  setFormData({ ...formData, location: text })
                }
              />
            </View>
            <View className="mb-4 w-full">
              <Text className="font-pregular text-gray-800 mb-2">
                Time
              </Text>
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
              <Text className="font-pregular text-gray-800 mb-2">
                Date
              </Text>
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
    case 2:
      return (
        <FormScreen heading="Upload Evidence" disabledContidion={false} setStep={setStep}>
          <View>
          <TouchableOpacity
              onPress={pickImage}
              className="bg-gray-200 py-3 px-4 rounded-lg mb-4"
            >
              <Text className="text-blue-500">Upload Image</Text>
            </TouchableOpacity>
          </View>
        </FormScreen>
      );
  }
};

export default ChooseTypeScreen;
