import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font"

export default function RootLayout() {
  const [loaded] = useFonts({
    "Noto Sans KR": require("../assets/fonts/NotoSansKR.ttf"),
  });
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  );
}
