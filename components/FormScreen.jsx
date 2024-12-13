import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormContainer from './FormContainer'
import FormHeader from './FormHeader'
import NextButton from './NextButton'

const FormScreen = ({ heading, disabledContidion, setStep, children }) => {
  return (
    <SafeAreaView className="flex-1 bg-white p-7 min-h-full">
        <FormHeader heading={heading} />
        <FormContainer>
            {children}
        </FormContainer>
        <NextButton disabledContidion={disabledContidion} setStep={setStep} />
        <StatusBar style="auto light" />
    </SafeAreaView>
  )
}

export default FormScreen;