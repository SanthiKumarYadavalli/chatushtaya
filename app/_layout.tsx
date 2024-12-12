import { Stack } from "expo-router";
import "./global.css";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="report" />
      <Stack.Screen name="history" />
      <Stack.Screen name="support" />
      <Stack.Screen name="profile" />
    </Stack>
  );
}
