import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const FormContainer = ({children}) => {
    return (
        <SafeAreaView className="flex-1 bg-white p-7 min-h-full">
            {children}
        </SafeAreaView>
    );
}

export default FormContainer;