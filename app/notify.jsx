
import React, { useEffect } from "react";
import { Platform, view, Button } from "react-native";
import PushNotification, { PushNotificationIOS } from "react-native-push-notification";

const App = () => {
  useEffect(() => {
    // Configure Push Notification
    PushNotification.configure({
      // Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        console.log("Notification received:", notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      // Request permissions on iOS
      requestPermissions: Platform.OS === "ios",
    });

    // Create a local notification
    PushNotification.localNotification({
      title: "Hello",
      message: "This is a test notification!",
      playSound: true,
      soundName: "default",
    });

    return () => {
      PushNotification.unsubscribe();
    };
  }, []);

  return <></>;
};

export default App;
