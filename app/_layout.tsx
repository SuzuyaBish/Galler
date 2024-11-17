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
    SwitzerLight: require("../assets/fonts/Switzer/Switzer-Light.otf"),
    SwitzerRegular: require("../assets/fonts/Switzer/Switzer-Regular.otf"),
    SwitzerMedium: require("../assets/fonts/Switzer/Switzer-Medium.otf"),
    SwitzerBold: require("../assets/fonts/Switzer/Switzer-Bold.otf"),
    SwitzerBlack: require("../assets/fonts/Switzer/Switzer-Black.otf"),
    Gambarino: require("../assets/fonts/Gambarino/Gambarino-Regular.otf"),
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
          <Stack.Screen
            name="random"
            options={{
              headerShown: false,
              presentation: "transparentModal",
              animation: "fade",
            }}
          />
        </Stack>
        <BottomActions />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}
