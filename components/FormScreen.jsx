import React from 'react'
import { StatusBar } from 'expo-status-bar'
import FormHeader from './FormHeader'
import NextButton from './NextButton'
import FormContainer from './FormContainer'
import InputsContainer from './InputsContainer'
import { TouchableOpacity, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from 'expo-router'

const FormScreen = ({ heading, disabledContidion, buttonOnPress, children, onSkip, skipButton = false, required = true, buttonText = "Next" }) => {
  const navigation = useNavigation();
  return (
    <FormContainer>
        <FormHeader heading={heading} required={required && !skipButton} />
        <TouchableOpacity className="absolute top-16 right-5 w-10 h-10" onPress={() => navigation.reset({ index: 0, routes: [{ name: "home" }]})}>
          <Ionicons name="close" size={30} color="#999"/>
        </TouchableOpacity>
        <InputsContainer>
            {children}
        </InputsContainer>
        {skipButton && (
          <TouchableOpacity className="mb-5" onPress={onSkip}>
            <Text className="text-center text-lg text-gray-400 text-pregular">Skip this step</Text>
          </TouchableOpacity>
        )}
        <NextButton disabledContidion={disabledContidion} onPress={buttonOnPress} text={buttonText} />
        <StatusBar style="auto light" />
    </FormContainer>
  )
}

export default FormScreen;