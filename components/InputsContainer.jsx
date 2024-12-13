import { ScrollView } from 'react-native'
import React from 'react'

const InputsContainer = ({ children }) => {
  return (
    <ScrollView
        contentContainerStyle={{
        paddingVertical: 20,
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        }}
    >
        {children}
    </ScrollView>
  )
}

export default InputsContainer;