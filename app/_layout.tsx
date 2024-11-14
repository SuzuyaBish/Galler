import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { useFonts } from "expo-font"
import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { useEffect } from "react"
import "react-native-reanimated"
import "../global.css"

import BottomActions from "@/components/BottomActions"
import "react-native-gesture-handler"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import "react-native-reanimated"

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded] = useFonts({
    SatoshiLight: require("../assets/fonts/Satoshi/Satoshi-Light.otf"),
    SatoshiRegular: require("../assets/fonts/Satoshi/Satoshi-Regular.otf"),
    SatoshiMedium: require("../assets/fonts/Satoshi/Satoshi-Medium.otf"),
    SatoshiBold: require("../assets/fonts/Satoshi/Satoshi-Bold.otf"),
    SatoshiBlack: require("../assets/fonts/Satoshi/Satoshi-Black.otf"),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <BottomActions />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}
