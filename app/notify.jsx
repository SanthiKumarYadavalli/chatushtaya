import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';

// Frontend Test Notification Component
export const Notify = () => {
  const [fcmToken, setFcmToken] = useState('');
  const [customMessage, setCustomMessage] = useState('');

  // Request Notification Permission
  const requestNotificationPermission = async () => {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
        getFCMToken();
      }
    } catch (error) {
      console.error('Permission request error:', error);
      Alert.alert('Permission Error', 'Could not request notification permissions');
    }
  };

  // Get FCM Token
  const getFCMToken = async () => {
    try {
      const token = await messaging().getToken();
      setFcmToken(token);
      console.log('FCM Token:', token);
    } catch (error) {
      console.error('Error getting FCM token:', error);
      Alert.alert('Token Error', 'Could not retrieve Firebase token');
    }
  };

  // Simulate Local Notification (since direct sending is typically done via backend)
  const simulateNotification = () => {
    if (!fcmToken) {
      Alert.alert('No Token', 'Please get FCM token first');
      return;
    }

    const notificationPayload = {
      notification: {
        title: 'Test Notification',
        body: customMessage || 'This is a test notification from the app',
      },
      data: {
        type: 'test_notification',
        timestamp: Date.now().toString()
      }
    };

    console.log('Simulated Notification Payload:', notificationPayload);
    Alert.alert(
      'Notification Simulated', 
      `Payload created for token: ${fcmToken.substring(0, 10)}...`
    );
  };

  // Handle Foreground Message
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('Foreground Message', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  // Initial Setup
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notification Test</Text>
      
      {fcmToken ? (
        <View style={styles.tokenContainer}>
          <Text style={styles.tokenLabel}>FCM Token:</Text>
          <Text numberOfLines={1} style={styles.tokenText}>
            {fcmToken}
          </Text>
        </View>
      ) : (
        <Button 
          title="Get FCM Token" 
          onPress={getFCMToken} 
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Custom Notification Message"
        value={customMessage}
        onChangeText={setCustomMessage}
      />
      
      <Button 
        title="Simulate Notification" 
        onPress={simulateNotification} 
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5
  },
  tokenContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5
  },
  tokenLabel: {
    fontWeight: 'bold',
    marginBottom: 5
  },
  tokenText: {
    fontSize: 12,
    color: '#333'
  }
});

export default Notify;