import HeaderNavigation from "@/src/components/HeaderNavigation";
import { Colors } from "@/src/constants/colors";
import { Typography } from "@/src/constants/typography";
import { UserContext } from "@/src/contexts/UserContext";
import { Stack, usePathname } from "expo-router";
import { useContext } from "react";
import { Text } from "react-native";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingHorizontal: 16,
    },
})

export default function RecordScreenLayout() {
    const pathname = usePathname();
    const user = useContext(UserContext);

    return (
        <SafeAreaView style={ Styles.screen }>
            <Stack screenOptions={{ headerShown: false, animation: 'none' }} >
                <Stack.Screen name="index" />
            </Stack>
        </SafeAreaView>
    );
}
