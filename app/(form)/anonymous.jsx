import { useNavigation } from "expo-router";
import { useReportContext } from "../../context/ReportProvider";
import FormScreen from "../../components/FormScreen";
import { Text, View } from "react-native";
import { Checkbox } from "react-native-paper";

export default function AnonymousScreen() {
    const { formData, changeValue } = useReportContext();
    const navigation = useNavigation();

    return (
        <FormScreen
            heading=""
            disabledContidion={false}
            buttonOnPress={() => navigation.reset({ index: 0, routes: [{ name: "success" }]})}
            buttonText="Submit"    
            required={false}
        >
            <Text className="text-center text-2xl font-pmedium">We value your privacy</Text>
            <View className="flex-row items-center mt-10">
                <Checkbox.Item 
                    label="Submit Anonymously"
                    status={formData.isAnonymous ? 'checked' : 'unchecked'} 
                    position="leading"
                    color="#6892D5"
                    onPress={() => changeValue("isAnonymous", !formData.isAnonymous)}
                />
            </View>
        </FormScreen>
    )
}