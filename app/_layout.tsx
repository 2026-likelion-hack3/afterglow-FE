import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font"

export default function RootLayout() {
  const [loaded] = useFonts({
    "Noto Sans KR Black": require("../assets/fonts/NotoSansKR-Black.ttf"),
    "Noto Sans KR Bold": require("../assets/fonts/NotoSansKR-Bold.ttf"),
    "Noto Sans KR Regular": require("../assets/fonts/NotoSansKR-Regular.ttf"),
  });
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  );
}
