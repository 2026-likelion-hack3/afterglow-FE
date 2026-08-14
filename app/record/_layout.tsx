import HeaderNavigation from "@/src/components/HeaderNavigation";
import { Colors } from "@/src/constants/colors";
import { Stack, usePathname } from "expo-router";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingHorizontal: 16,
    },
})

export default function OnboardingLayout() {
    const pathname = usePathname();

    return (
        <SafeAreaView style={ Styles.screen }>
            <HeaderNavigation route={'/(tabs)'} title="증상 기록" key={0} />
            <Stack screenOptions={{ headerShown: false, animation: 'none' }} />
        </SafeAreaView>
    );
}
