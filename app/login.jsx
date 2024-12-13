import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { validateUser } from "../backend/functions"; // Adjust the import path as necessary
import tailwind from "twrnc";

const Login = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        const response = await validateUser({ email, password });
        console.log(response); // Log the response to the console

        if (response.success) {
            onLoginSuccess(); // Call the function to update login status
            
        } else {
            Alert.alert("Login Failed", response.message); // Show an alert on failure
        }
    };

    return (
        <View style={tailwind`flex-1 justify-center p-4 bg-white`}>
            <Text style={tailwind`text-2xl mb-6 text-center`}>Login</Text>
            <TextInput
                style={tailwind`border border-gray-300 h-10 mb-4 p-2`}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                required
            />
            <TextInput
                style={tailwind`border border-gray-300 h-10 mb-4 p-2`}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                required
            />
            <TouchableOpacity style={tailwind`bg-blue-500 p-2 rounded`} onPress={handleSubmit}>
                <Text style={tailwind`text-white text-center`}>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Login;