import React from "react";
import { Stack } from "expo-router";
import { ReportProvider } from "../../context/ReportProvider";

const RootLayout = () => {
  return (
    <ReportProvider>
      <Stack>
        <Stack.Screen name="type" options={{ headerShown: false }} />
        <Stack.Screen name="locationdt" options={{ headerShown: false }} />
        <Stack.Screen name="upload" options={{ headerShown: false }} />
        <Stack.Screen name="details" options={{ headerShown: false }} />
        <Stack.Screen name="success" options={{ headerShown: false }} />
      </Stack>
    </ReportProvider>
  );
};

export default RootLayout;
