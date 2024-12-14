import { Text, View, ActivityIndicator } from 'react-native'
import React from 'react'
import FormContainer from '../../components/FormContainer'

const LoadingScreen = () => {
  return (
    <FormContainer>
        <View className="flex items-center justify-center h-full">
            <ActivityIndicator size="large" color="#6892D5" />
            <Text className="text-xl text-gray-800 font-pmedium">Submitting...</Text>
        </View>
    </FormContainer>
  )
}

export default LoadingScreen;