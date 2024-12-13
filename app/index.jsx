import React,{useEffect,useState} from "react";
import firebase from "firebase/compat/app";
import Login from "./login";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  Pressable,
} from "react-native";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";

const firebaseConfig ={
  apiKey:"AIzaSyD8jVYTFaAGFe0aXJwdjBOq1gri-5tJ68s",
  authDomain:"chatushtaya-b4512.firebaseapp.com",
  projectId:"chatushtaya-b4512",
  storageBucket:"chatushtaya-b4512.appspot.com",
  messagingSenderId:"818680022816",
  appId:"1:818680022816:android:f0651bb143e8f702993945",
  measurementId:"G-6JXQXQVXQX"
}
// Inititialize Firebase
if (!firebase.apps.length) {
  console.log("firebase initialized now");
  firebase.initializeApp(firebaseConfig);
} else {
  console.log("firebase already initialized");
  firebase.app(); // if already initialized
}
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
      setIsLoggedIn(true);
  };
  
  return (
    <Login onLoginSuccess={handleLoginSuccess} />
  );
};

export default App;
