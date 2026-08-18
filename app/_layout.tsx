import { router, Stack, useFocusEffect } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font"
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserProvider } from "@/src/contexts/UserContext";
import * as NavigationBar from "expo-navigation-bar";
import { AppState, AppStateStatus } from "react-native";
import { ScanProvider } from "@/src/contexts/ScanContext";
import { RecordSymptomProvider } from "@/src/contexts/RecordContext";
import { UserDataProvider } from "@/src/contexts/UserDataContext";
import { PostProvider } from "@/src/contexts/PostContext";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    "Noto Sans KR Black": require("../assets/fonts/NotoSansKR-Black.ttf"),
    "Noto Sans KR Bold": require("../assets/fonts/NotoSansKR-Bold.ttf"),
    "Noto Sans KR Regular": require("../assets/fonts/NotoSansKR-Regular.ttf"),
  });

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === "active") {
        NavigationBar.setVisibilityAsync("hidden");
      }
    };

    // 앱 상태 변화 리스너 등록
    const subscription = AppState.addEventListener("change", handleAppStateChange);

    return () => {
      // 컴포넌트 언마운트 시 리스너 제거
      subscription.remove();
    };
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

  

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <UserProvider>
        <UserDataProvider>
        <RecordSymptomProvider>
        <ScanProvider>
        <PostProvider>
          <Stack screenOptions={{ headerShown: false, animation: 'none' }} />
        </PostProvider>
        </ScanProvider>
        </RecordSymptomProvider>
        </UserDataProvider>
      </UserProvider>
    </SafeAreaProvider>
  );
}
