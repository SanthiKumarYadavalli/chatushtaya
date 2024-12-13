import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";

export default function Message(props) {
  const date = new Date();
  return (
    <View style={styles.message}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Image
            source={require("../assets//icons/user.png")}
            style={styles.icon}
          />
          <Text className="font-pregular">Username</Text>
        </View>
        <Text style={{ fontSize: 10 }} className="font-plight">
          {date.getHours()}:{date.getMinutes()}
        </Text>
      </View>
      <Text
        style={{ fontSize: 14, width: "100%", flex: 1, paddingLeft: 0 }}
        className="font-plight"
      >
        {props.message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
    flexDirection: "column",
    gap: 8,
    backgroundColor: "#f1f2f3",
    marginBottom: 8,
    padding: 16,
    borderRadius: 16,
  },
  icon: {
    width: 28,
    height: 28,
  },
});
