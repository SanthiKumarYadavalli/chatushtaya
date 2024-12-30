import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
} from 'react-native';

import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthContext } from '../context/AuthProvider';
import { Toast } from 'toastify-react-native';
import { updateMember, setStoredUser } from '../backend/utils';
import { Ionicons } from '@expo/vector-icons';
import LoadingScreen from "./(form)/loading";

const AccountSettings = () => {
    const { user, setUser } = useAuthContext();
    const [username, setUsername] = useState(user.username);
    const [email] = useState(user.email);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || '');
    const [loading, setLoading] = useState(false);

    if(loading){
        return <LoadingScreen />
    }
    const handleUpdate = async () => {
        setLoading(true);
        try {
            const updatedUser = { ...user, username, phoneNumber };
            await updateMember(email, updatedUser);
            setUser(updatedUser);
            setStoredUser(updatedUser);
            Toast.success("updated successfully");
            router.back();
        } catch (error) {
            Toast.error("Failed to update account details. Please try again.");
            console.error("Failed to update account details:", error);
        }finally{
            setLoading(false)
        }
    };

    // const handleDeleteAccount = () => {
    //     Alert.prompt(
    //         'Delete Account',
    //         'Please enter your email to confirm account deletion:',
    //         [
    //             {
    //                 text: 'Cancel',
    //                 style: 'cancel',
    //             },
    //             {
    //                 text: 'Delete',
    //                 onPress: (inputEmail) => {
    //                     if (inputEmail === email) {
    //                         deleteUser();
    //                         Alert.alert('Account Deleted', 'Your account has been deleted successfully.');
    //                         router.replace("login");
    //                     } else {
    //                         Alert.alert('Error', 'Email does not match.');
    //                     }
    //                 },
    //             },
    //         ],
    //         'plain-text'
    //     );
    // };

    return (
        <SafeAreaView className="flex-1 bg-white px-4">
            <View className="mb-6 w-full">
                <TouchableOpacity onPress={() => router.back()} style={{ position: 'absolute', top: 12, left: 16 }}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text className="text-lg font-pregular mb-2 text-center mt-10">Account Settings</Text>
                <View className="items-center mb-6 mt-12">
                    <Image
                        source={{
                            uri: `https://ui-avatars.com/api/?name=${user.username}&background=random`,
                        }}
                        className="w-32 h-32 rounded-full  mb-4"
                    />
                </View>
                <View className="bg-white p-4 rounded-lg shadow-md mb-4">
                    <Text className="text-gray-700 mb-2">Username</Text>
                    <TextInput
                        value={username}
                        onChangeText={setUsername}
                        className="bg-gray-100 p-2 rounded-lg"
                    />
                </View>
                <View className="bg-white p-4 rounded-lg shadow-md mb-4">
                    <Text className="text-gray-700 mb-2">Email</Text>
                    <TextInput
                        value={email}
                        className="bg-gray-100 p-2 rounded-lg"
                        keyboardType="email-address"
                        editable={false}
                    />
                </View>
                <View className="bg-white p-4 rounded-lg shadow-md mb-4">
                    <Text className="text-gray-700 mb-2">Phone Number</Text>
                    <TextInput
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        className="bg-gray-100 p-2 rounded-lg"
                        keyboardType="phone-pad"
                    />
                </View>
                <TouchableOpacity
                    onPress={handleUpdate}
                    className="bg-blue-500 p-4 rounded-lg shadow-md mb-4"
                >
                    <Text className="text-white text-center">Save Changes</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                    onPress={handleDeleteAccount}
                    className="bg-red-500 p-4 rounded-lg shadow-md"
                >
                    <Text className="text-white text-center">Delete Account</Text>
                </TouchableOpacity> */}
            </View>
        </SafeAreaView>
    );
};

export default AccountSettings;