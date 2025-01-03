import axios from 'axios';
import { Linking, Alert } from 'react-native';
import * as Location from 'expo-location';

export const sendAll = (title, body) => {
  axios.post("https://app.nativenotify.com/api/notification", {
      appId: 25927,
      appToken: "HGI5ruHQdqOWyprR6XBqdv",
      title,
      body,
      // url: "https://www.google.com"
  });
}

export const openURL = async (url) => {
  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Error', `Cannot open the URL: ${url}`);
    }
  } catch (error) {
    Alert.alert('Error', `Failed to open URL: ${error.message}`);
  }
};

export const getLocation = async () => {
  try {
    // Request permissions
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.errror('Location permission not granted');
      return;
    }

    // Get current location
    const currentLocation = await Location.getCurrentPositionAsync({});
    return currentLocation;
  } catch (error) {
    Alert.alert('Error', `Failed to get location: ${error.message}`);
  }
};

export const sendLocation = async () => {
  try {
    const location = await getLocation();
    sendAll("Help", `${location.coords.latitude}, ${location.coords.longitude}`);
  } catch (error) {
    Alert.alert('Error', `Failed to send location: ${error.message}`);
  }
}