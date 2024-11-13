import { Colors } from "@/constants/colors"
import * as Haptics from "expo-haptics"
import * as MediaLibrary from "expo-media-library"
import { SquircleView } from "expo-squircle-view"
import { ChevronLeftIcon } from "lucide-react-native"
import React, { useState } from "react"
import { Pressable, useColorScheme } from "react-native"
import Animated, {
  FadeIn,
  FadeInUp,
  FadeOut,
  FadeOutDown,
  FadeOutLeft,
  LinearTransition,
} from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Text } from "../StyledComponents"
import FolderIcon from "../icons/FolderIcon"
import ImageIcon from "../icons/ImageIcon"
import AlbumViewer from "./AlbumViewer"

export default function CreateLanding() {
  const colorscheme = useColorScheme()
  const colors = Colors[colorscheme ?? "light"]
  const [pressed, setPressed] = useState(false)
  const insets = useSafeAreaInsets()
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions()

  return (
    <Animated.View
      layout={LinearTransition.stiffness(1000).damping(500).mass(3)}
      entering={FadeIn.delay(300)}
      className="flex-1 gap-y-2"
    >
      <Animated.View
        layout={LinearTransition.stiffness(1000).damping(500).mass(3)}
        style={[
          {
            marginTop: pressed ? insets.top : "auto",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            justifyContent: pressed ? "space-between" : "flex-start",
          },
        ]}
      >
        {pressed && (
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            <ChevronLeftIcon color={colors.icon} size={28} strokeWidth={3} />
          </Animated.View>
        )}
        <Animated.Text
          entering={FadeIn}
          exiting={FadeOutLeft}
          layout={LinearTransition.stiffness(1000).damping(500).mass(3)}
          className="text-xl"
          style={[
            {
              color: colors.darkMutedText,
              fontFamily: "SatoshiBold",
            },
          ]}
        >
          {pressed ? "Select Media" : "Step 1"}
        </Animated.Text>
        <Animated.View>
          <ChevronLeftIcon color={"transparent"} size={28} strokeWidth={3} />
        </Animated.View>
      </Animated.View>
      {pressed && <AlbumViewer />}
      {!pressed && (
        <Animated.View
          exiting={FadeOut}
          entering={FadeIn.delay(200)}
          className="flex flex-row flex-wrap items-center gap-x-2"
        >
          <Text className="text-4xl" family="SatoshiBold">
            Create a
          </Text>
          <FolderIcon color={colors.icon} height={30} width={30} />
          <Text className="text-4xl" family="SatoshiBold">
            folder
          </Text>
          <Text className="text-4xl" family="SatoshiBold">
            or add some media
          </Text>
          <ImageIcon color={colors.icon} height={30} width={30} />
        </Animated.View>
      )}

      {!pressed && (
        <Animated.View entering={FadeInUp} exiting={FadeOutDown}>
          <Pressable className="mt-5">
            <SquircleView
              borderRadius={20}
              style={{
                backgroundColor: colors.lightBgMuted,
                padding: 22,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text className="text-2xl" family="SatoshiBold">
                Folder
              </Text>
              <FolderIcon color={colors.icon} height={24} width={24} />
            </SquircleView>
          </Pressable>
        </Animated.View>
      )}

      <Pressable
        className="mt-1"
        style={{
          marginTop: pressed ? "auto" : 0,
        }}
        onPress={async () => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)

          if (permissionResponse?.status !== "granted") {
            const response = await requestPermission()

            if (response.granted) {
              setPressed(true)
            }
          } else {
            setPressed(true)
          }
        }}
      >
        <SquircleView
          borderRadius={20}
          style={{
            backgroundColor: colors.lightBgMuted,
            padding: 22,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text className="text-2xl" family="SatoshiBold">
            Media
          </Text>
          <ImageIcon color={colors.icon} height={24} width={24} />
        </SquircleView>
      </Pressable>
    </Animated.View>
  )
}
