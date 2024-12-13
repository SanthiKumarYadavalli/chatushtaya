import React from 'react'
import { StatusBar } from 'expo-status-bar'
import FormHeader from './FormHeader'
import NextButton from './NextButton'
import FormContainer from './FormContainer'
import InputsContainer from './InputsContainer'

const FormScreen = ({ heading, disabledContidion, buttonOnPress, children, buttonText = "Next" }) => {
  return (
    <FormContainer>
        <FormHeader heading={heading} />
        <InputsContainer>
            {children}
        </InputsContainer>
        <NextButton disabledContidion={disabledContidion} onPress={buttonOnPress} text={buttonText} />
        <StatusBar style="auto light" />
    </FormContainer>
  )
}

export default FormScreen;