import { Text, View } from 'react-native'
import React from 'react'

const FormHeader = ({ heading, required }) => {
  return (
    <View className="flex flex-row mt-10">
        <Text className="text-left text-3xl font-pregular">
          {heading}
          {required && <Text className="text-red-500">*</Text>}
        </Text>
    </View>
  )
}

export default FormHeader;