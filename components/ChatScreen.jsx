import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StatusBar as RNStatusBar,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Response from "./response";
import Message from "./message";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SendHorizonal } from "lucide-react-native";
import { AutoScrollFlatList } from "react-native-autoscroll-flatlist";

export default function ChatScreen() {
  const [inputText, setInputText] = useState("");
  const [listData, setListData] = useState([]);

  const SearchInput = () => {
    if (inputText.trim()) {
      setListData((prevList) => [...prevList, inputText]);
      setInputText("");
    }
  };

  return (
    <View className="h-[90vh] mt-10">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={RNStatusBar.currentHeight || 0} // Adjust for status bar height
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <StatusBar style="black" />

            {/* Header */}
            <View style={styles.header}>
              <Image
                source={require("../assets/icons/robot.png")}
                style={styles.icon}
              />
              <Text className="text-3xl font-pregular ">Naira</Text>
            </View>

            {/* Content */}
            {listData.length === 0 ? (
              <View className="justify-center items-center w-full h-[80%]">
                <Text className="text-center text-lg font-pregular">Hi 👋</Text>
                <Text className="text-center text-lg font-pregular">
                  How are you feeling today?
                </Text>
              </View>
            ) : (
              <AutoScrollFlatList
                indicatorComponent={<></>}
                style={{ paddingHorizontal: 16, marginBottom: 80 }}
                data={listData}
                threshold={20}
                renderItem={({ item }) => (
                  <View>
                    <Message message={item} />
                    <Response prompt={item} />
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                keyboardShouldPersistTaps="handled" // Allow taps on the list even when the keyboard is open
                contentContainerStyle={{ paddingBottom: 100 }} // Add padding to the bottom
              />
            )}

            {/* Search-Bar */}
            <View style={styles.searchBar}>
              <TextInput
                placeholder="I'm here for you"
                style={styles.input}
                value={inputText}
                onChangeText={(text) => setInputText(text)}
                selectionColor={"#323232"}
                className="font-plight"
                multiline
              />
              <TouchableOpacity onPress={SearchInput} className="mx-3">
                <SendHorizonal size={24} color="#323232" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    paddingTop: 36,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    margin: 20,
    gap: 8,
  },
  icon: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  searchBar: {
    width: "100%",
    position: "absolute",
    bottom: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginTop: 10,
    gap: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 32,
    borderWidth: 0.1,
  },
});
