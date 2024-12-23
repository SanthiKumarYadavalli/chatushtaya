import React from 'react'
import { StatusBar } from 'expo-status-bar'
import FormHeader from './FormHeader'
import NextButton from './NextButton'
import FormContainer from './FormContainer'
import InputsContainer from './InputsContainer'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from 'expo-router'

const FormScreen = ({ heading, disabledContidion, buttonOnPress, children, buttonText = "Next" }) => {
  const navigation = useNavigation();
  return (
    <FormContainer>
        <FormHeader heading={heading} />
        <TouchableOpacity className="absolute top-16 right-5 w-10 h-10" onPress={() => navigation.reset({ index: 0, routes: [{ name: "home" }]})}>
          <Ionicons name="close" size={30} color="#999"/>
        </TouchableOpacity>
        <InputsContainer>
            {children}
        </InputsContainer>
        <NextButton disabledContidion={disabledContidion} onPress={buttonOnPress} text={buttonText} />
        <StatusBar style="auto light" />
    </FormContainer>
  )
}

export default FormScreen;