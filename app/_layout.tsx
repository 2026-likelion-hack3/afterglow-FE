import { router, Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font"
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserProvider } from "@/src/contexts/UserContext";
import * as NavigationBar from "expo-navigation-bar";

export default function RootLayout() {
  const [loaded] = useFonts({
    "Noto Sans KR Black": require("../assets/fonts/NotoSansKR-Black.ttf"),
    "Noto Sans KR Bold": require("../assets/fonts/NotoSansKR-Bold.ttf"),
    "Noto Sans KR Regular": require("../assets/fonts/NotoSansKR-Regular.ttf"),
  });
  
  useEffect(() => {
    NavigationBar.setVisibilityAsync("hidden");
  }, []);

  useEffect(() => {
    if (!loaded) return;

    const checkOnboarding = async () => {
      const completed = await AsyncStorage.getItem("onboardingCompleted");

      if (completed === "true") {
        router.replace("/(tabs)");
      } else {
        router.replace("/onboarding");
      }
    };

    checkOnboarding();
  }, [loaded]);

  return (
    <SafeAreaProvider>
      <UserProvider>
        <Stack screenOptions={{ headerShown: false, animation: 'none' }} />
      </UserProvider>
    </SafeAreaProvider>
  );
}
