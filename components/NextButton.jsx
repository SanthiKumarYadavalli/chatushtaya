import { Pressable, Text, View } from 'react-native'
import React from 'react'

const NextButton = ({ disabledContidion, setStep }) => {
  return (
    <View className="">
    <Pressable
      className={`py-4 rounded-xl w-full bg-mylavender`}
      onPress={() => setStep(prev => prev + 1)}
      disabled={disabledContidion}
      style={{opacity : (disabledContidion ? 0.5 : 1)}}
    > 
      <Text className="text-center text-lg text-white font-pmedium">Next</Text>
    </Pressable>
  </View>
  )
}

export default NextButton;