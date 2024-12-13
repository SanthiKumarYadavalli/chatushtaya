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
    <View className="h-[80vh] mt-10">
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
              <Text
                style={{ fontSize: 24, fontWeight: "800", color: "#323232" }}
              >
                AI
              </Text>
            </View>

            {/* Content */}
            <FlatList
              style={{ paddingHorizontal: 16, marginBottom: 80 }}
              data={listData}
              renderItem={({ item }) => (
                <View>
                  <Message message={item} />
                  <Response prompt={item} />
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />

            {/* Search-Bar */}
            <View style={styles.searchBar}>
              <TextInput
                placeholder="Ask to Gemini"
                style={styles.input}
                value={inputText}
                onChangeText={(text) => setInputText(text)}
                selectionColor={"#323232"}
              />
              <TouchableOpacity onPress={SearchInput}>
                <AntDesign name="arrowright" size={28} color="black" />
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
    margin: 8,
    gap: 8,
  },
  icon: {
    width: 32,
    height: 32,
  },
  searchBar: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 16,
    gap: 8,
    // backgroundColor: "#f9f9f9",
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
