import { Colors } from "@/src/constants/colors";
import { Stack, usePathname } from "expo-router";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const Styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: Colors.background.page
    },
    statusBar: {
        marginTop: 20,
        height: 4.08,
        borderRadius: 200,
        backgroundColor: Colors.border.dark
    }
})

export default function OnboardingLayout() {
    const pathname = usePathname();
    const { width } = useWindowDimensions();
    const progress = 
        pathname === '/onboarding/age' ? 1 :
        pathname === '/onboarding/period' ? 2 :
        0;
    const progressStep = ( width - 32 ) / 3;
    
    const animatedStyle = useAnimatedStyle(() => ({
        width: withTiming(progressStep * progress, {
            duration: 300,
        }),
    }));

    return (
        <SafeAreaView style={ Styles.screen }>
            {progress > 0 && (
                <Animated.View style={ [
                    Styles.statusBar,
                    animatedStyle
                ] } />
            )}
            <Stack screenOptions={{ headerShown: false, animation: 'none' }} />
        </SafeAreaView>
    );
}
