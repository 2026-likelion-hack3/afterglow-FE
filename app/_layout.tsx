import { router, Stack, useFocusEffect } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
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
import { createAnonymousAccount } from "@/src/api/account";
import { getAccessToken, saveAccessToken } from "@/src/api/storage";

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

    const initApp = async () => {
      try {
        // 1. 익명 계정 토큰 생성 및 저장
        const existingToken = await getAccessToken();
        if (!existingToken) {
          const response = await createAnonymousAccount();
          if (response?.accessToken) {
            await saveAccessToken(response.accessToken);
          }
        }

        // 2. 온보딩 상태 확인 및 라우팅
        const completed = await AsyncStorage.getItem("onboardingCompleted");
        if (completed === "true") {
          router.replace("/(tabs)");
        } else {
          router.replace("/onboarding");
        }
      } catch (error) {
        console.error("앱 초기화 중 오류 발생:", error);
      } finally {
        // 3. 초기화 또는 라우팅 완료 후 스플래시 해제
        await SplashScreen.hideAsync();
      }
    };

    initApp();
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