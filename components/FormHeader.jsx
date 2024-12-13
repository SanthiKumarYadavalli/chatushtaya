import { Text, View } from 'react-native'
import React from 'react'

const FormHeader = ({ heading }) => {
  return (
    <View>
        <Text className="text-left text-3xl mt-10 font-pregular">{heading}</Text>
    </View>
  )
}

export default FormHeader;