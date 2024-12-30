import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOUR_STEPS = [
  {
    id: 1,
    target: 'phoneButton',
    title: 'Dial 100',
    description: 'You can dial 100 by clicking this button',
    position: 'top-right',
  },
  {
    id: 2,
    target: 'helpSupportButton',
    title: 'Help & Support',
    description: 'Access and manage your reports, chat with chatbot, find official contacts',
    position: 'left',
  },
  {
    id: 3,
    target: 'reportButton',
    title: 'Report!',
    description: 'File a Report by clicking this button',
    position: 'right',
  },
  {
    id: 4,
    target: 'profileButton',
    title: 'Profile',
    description: 'Access Your profile details',
    position: 'bottom-left',
  },
];

const AppTour = ({ onComplete, phoneButtonRef, helpSupportButtonRef, reportButtonRef, profileButtonRef }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [opacity] = useState(new Animated.Value(0));
  const [measurements, setMeasurements] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    checkIfFirstTime();
  }, []);

  const checkIfFirstTime = async () => {
    try {
      const hasSeenTour = await AsyncStorage.getItem('hasSeenAppTour');
      if (!hasSeenTour) {
        setIsVisible(true);
        fadeIn();
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const fadeIn = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsVisible(false));
  };

  const measureElement = (target) => {
    return new Promise((resolve) => {
      if (!target) resolve(null);
      target.measure((x, y, width, height, pageX, pageY) => {
        resolve({
          x: pageX,
          y: pageY,
          width,
          height,
        });
      });
    });
  };

  const updateHighlightPosition = async () => {
    const currentTarget = TOUR_STEPS[currentStep].target;
    const element = {
      phoneButton: phoneButtonRef,
      helpSupportButton: helpSupportButtonRef,
      reportButton: reportButtonRef,
      profileButton: profileButtonRef,
    }[currentTarget]; // Dynamically select the target element

    if (element?.current) {
      const measurement = await measureElement(element.current);
      setMeasurements(measurement);
    }
  };

  useEffect(() => {
    if (isVisible) {
      updateHighlightPosition();
    }
  }, [currentStep, isVisible]);

  const handleNext = async () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      fadeOut();
      await AsyncStorage.setItem('hasSeenAppTour', 'true');
      onComplete?.();
    }
  };

  if (!isVisible) return null;

  return (
    <TouchableWithoutFeedback onPress={handleNext}>
      <Animated.View style={[styles.container, { opacity }]}>
        {measurements && (
          <View
            style={[
              styles.highlight,
              {
                top: measurements.y - 5,
                left: measurements.x - 5,
                width: measurements.width + 10,
                height: measurements.height + 10,
              },
            ]}
          />
        )}
        <View style={styles.tooltipContainer}>
          <Text style={styles.title}>{TOUR_STEPS[currentStep].title}</Text>
          <Text style={styles.description}>{TOUR_STEPS[currentStep].description}</Text>
          <Text style={styles.hint}>Tap anywhere to continue</Text>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  highlight: {
    position: 'absolute',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#fff',
    zIndex: 1,
  },
  tooltipContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    maxWidth: '80%',
    marginHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  hint: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default AppTour;