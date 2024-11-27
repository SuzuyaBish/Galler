import { Colors } from "@/constants/colors"
import { PARENT_PADDING, TAB_BAR_HEIGHT } from "@/constants/dimensions"
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet"
import { BlurView } from "expo-blur"
import * as Haptics from "expo-haptics"
import React, { useRef } from "react"
import { Pressable } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import CreateLanding from "./create/CreateLanding"
import AddIcon from "./icons/PlusIcon"
import SearchIcon from "./icons/SearchIcon"
import SettingsIcon from "./icons/SettingsIcon"

export default function BottomActions() {
  const insets = useSafeAreaInsets()
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  return (
    <BlurView
      tint="dark"
      experimentalBlurMethod="dimezisBlurView"
      style={{
        left: 0,
        right: 0,
        paddingBottom: insets.bottom,
        height: TAB_BAR_HEIGHT,
      }}
      className="absolute bottom-0 flex flex-row items-center justify-between pt-4"
    >
      <Pressable
        className="rounded-full px-2 py-3"
        style={{ marginLeft: PARENT_PADDING }}
      >
        <SearchIcon color={Colors.icon} />
      </Pressable>
      <Pressable
        className="rounded-full px-7 py-3 transition-all duration-200 active:scale-95"
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
          bottomSheetRef.current?.present()
        }}
        style={{
          backgroundColor: Colors.mutedBackground,
        }}
      >
        <AddIcon color="white" />
      </Pressable>
      <Pressable
        className="rounded-full px-2 py-3"
        style={{ marginRight: PARENT_PADDING }}
      >
        <SettingsIcon color={Colors.icon} />
      </Pressable>
      <BottomSheetModal
        ref={bottomSheetRef}
        enableDynamicSizing
        handleStyle={{
          paddingBottom: 0,
        }}
        handleIndicatorStyle={{
          backgroundColor: Colors.mutedText,
        }}
        animationConfigs={{
          stiffness: 1000,
          damping: 500,
          mass: 3,
        }}
        backgroundStyle={{
          backgroundColor: Colors.mutedBackground,
          borderRadius: 22,
        }}
        backdropComponent={(e) => {
          return (
            <BottomSheetBackdrop
              onPress={() => bottomSheetRef.current?.dismiss()}
              appearsOnIndex={0}
              disappearsOnIndex={-1}
              style={[e.style, { backgroundColor: "rgba(0,0,0,0.6)" }]}
              animatedIndex={e.animatedIndex}
              animatedPosition={e.animatedPosition}
            />
          )
        }}
      >
        <BottomSheetView
          className="flex-1"
          style={{
            paddingHorizontal: PARENT_PADDING + 5,
            paddingVertical: PARENT_PADDING,
            paddingBottom: insets.bottom,
          }}
        >
          <CreateLanding onDone={() => bottomSheetRef.current?.dismiss()} />
        </BottomSheetView>
      </BottomSheetModal>
    </BlurView>
  )
}
