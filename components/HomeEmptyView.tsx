import { Colors } from "@/constants/colors"
import * as Haptics from "expo-haptics"
import React from "react"
import { Pressable, View, useColorScheme } from "react-native"
import Animated, { FadeIn, FadeOut } from "react-native-reanimated"
import { Text } from "./StyledComponents"
import ArchiveIcon from "./icons/ArchiveIcon"

export default function HomeEmptyView() {
  const colorscheme = useColorScheme()
  const colors = Colors[colorscheme ?? "light"]
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      className="mt-60 flex flex-col items-center justify-center gap-y-2"
    >
      <View
        className="rounded-2xl"
        style={{
          backgroundColor: colors.redColor,
          height: 70,
          width: 70,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ArchiveIcon color="white" height={40} width={40} />
      </View>
      <Text className="mt-2 text-xl" family="SatoshiBold">
        It's Quiet Here
      </Text>
      <View className="flex flex-col items-center justify-center">
        <Text className="text-lg" color={colors.darkMutedText}>
          Add a file or create a folder to get started.
        </Text>
        <Text className="text-lg" color={colors.darkMutedText}>
          You can also share your files to the app.
        </Text>
      </View>
      <Pressable
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        }}
        className="mt-5 rounded-full px-6 py-3 transition-all duration-200 active:scale-95"
        style={{
          backgroundColor: colors.iconBackground,
        }}
      >
        <Text className="text-lg" family="SatoshiBold">
          Add File
        </Text>
      </Pressable>
    </Animated.View>
  )
}
