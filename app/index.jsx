// import React, { useEffect } from "react";
// import { useAuthContext } from "../context/AuthProvider";
// import { Redirect } from "expo-router";
// import Landing from "./landing"
// import registerNNPushToken from 'native-notify';
// import { sendAll, openURL } from '../utils/notifications';
// import * as Notifications from 'expo-notifications';

// const App = () => {
//   registerNNPushToken(25927, 'HGI5ruHQdqOWyprR6XBqdv');
//   useEffect(() => {
//     // Register Native-Notify push notifications
//     // registerNNPushToken(YOUR_APP_ID, 'YOUR_APP_TOKEN');

//     // Listener for when a notification is clicked
//     const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
//       console.log(response);
//       const url = response?.notification?.request?.content?.data?.url || 'https://www.google.com';
//       openURL(url);
//     });

//     return () => {
//       subscription.remove(); // Clean up the listener
//     };
//   }, []);
//   sendAll("hello", "world");
//   const { user } = useAuthContext();
//   if (user) {
//     return <Redirect href="home" />
//   }
//   return <Landing />
// };

// export default App;



import React, { useEffect } from "react";
import { useAuthContext } from "../context/AuthProvider";
import { Redirect } from "expo-router";
import Landing from "./landing"
import registerNNPushToken from 'native-notify';

const App = () => {
  registerNNPushToken(25927, 'HGI5ruHQdqOWyprR6XBqdv');
  const { user } = useAuthContext();
  if (user) {
    return <Redirect href="home" />
  }
  return <Landing />
};

export default App;


// import React from "react";
// import { useAuthContext } from "../context/AuthProvider";
// import { Redirect } from "expo-router";
// import Landing from "./landing"
// import registerNNPushToken from 'native-notify';
// import { sendAll, getLocation } from '../utils/notifications';

// const App = () => {
//   registerNNPushToken(25927, 'HGI5ruHQdqOWyprR6XBqdv');
//   // sendAll("hello", "world");
//   const { user } = useAuthContext();
//   if (user) {
//     return <Redirect href="home" />
//   }
//   return <Landing />
// };

// export default App;
