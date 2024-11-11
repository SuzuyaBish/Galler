import { Colors } from "@/constants/colors"
import { PARENT_PADDING, TAB_BAR_HEIGHT } from "@/constants/dimensions"
import * as Haptics from "expo-haptics"
import React from "react"
import { Pressable, View, useColorScheme } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import AddIcon from "./icons/PlusIcon"
import SearchIcon from "./icons/SearchIcon"
import SettingsIcon from "./icons/SettingsIcon"

export default function BottomActions() {
  const colorscheme = useColorScheme()
  const colors = Colors[colorscheme ?? "light"]
  const insets = useSafeAreaInsets()
  return (
    <View
      style={{
        left: PARENT_PADDING,
        right: PARENT_PADDING,
        paddingBottom: insets.bottom,
        height: TAB_BAR_HEIGHT,
      }}
      className="absolute bottom-0 flex flex-row items-center justify-between pt-4"
    >
      <Pressable className="rounded-full px-2 py-3">
        <SearchIcon color={colors.icon} />
      </Pressable>
      <Pressable
        className="rounded-full px-7 py-3 transition-all duration-200 active:scale-95"
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        }}
        style={{
          backgroundColor: colors.iconBackground,
        }}
      >
        <AddIcon color={colors.icon} />
      </Pressable>
      <Pressable className="rounded-full px-2 py-3">
        <SettingsIcon color={colors.icon} />
      </Pressable>
    </View>
  )
}
