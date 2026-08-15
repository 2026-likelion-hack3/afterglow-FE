import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingHorizontal: 16,
    },
})

export default function AddScreenLayout() {
    return (
        <SafeAreaView style={ Styles.screen }>
            <Stack screenOptions={{ headerShown: false, animation: 'none' }} >
                <Stack.Screen name="index" />
            </Stack>
        </SafeAreaView>
    );
}
