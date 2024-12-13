import { Pressable, Text, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router';

const NextButton = ({ disabledContidion, setStep, text = "Next", homeButton = false }) => {

  function handlePress() {
    if (!homeButton) {
      setStep(prev => prev + 1);
    } else {
      router.replace("/home");
    }
  }

  return (
    <View className="">
    <Pressable
      className={`py-4 rounded-xl w-full bg-mylavender`}
      onPress={handlePress}
      disabled={disabledContidion}
      style={{opacity : (disabledContidion ? 0.5 : 1)}}
    > 
      <Text className="text-center text-lg text-white font-pmedium">{text}</Text>
    </Pressable>
  </View>
  )
}

export default NextButton;