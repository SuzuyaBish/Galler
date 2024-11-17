import { Text } from "@/components/StyledComponents"
import { Colors } from "@/constants/colors"
import { PARENT_PADDING } from "@/constants/dimensions"
import { share } from "@/lib/utils"
import { BlurView } from "expo-blur"
import { Image } from "expo-image"
import { useLocalSearchParams, useRouter } from "expo-router"
import { FolderOpenIcon, ShareIcon, Trash2Icon } from "lucide-react-native"
import React from "react"
import { Pressable, View } from "react-native"
import Animated from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"

type Params = {
  uri: string
  transitionTag: string
  width: string
  height: string
}

const AnimatedExpoImage = Animated.createAnimatedComponent(Image)
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)

export default function RandomScreen() {
  const insets = useSafeAreaInsets()
  const { uri, transitionTag, width, height } = useLocalSearchParams() as Params
  const router = useRouter()

  return (
    <Pressable className="flex-1" onPress={() => router.back()}>
      <AnimatedBlurView
        className="relative"
        tint="dark"
        intensity={80}
        style={{
          paddingTop: insets.top + 30,
          flex: 1,
        }}
      >
        <View
          className="flex w-full items-center justify-center px-20"
          style={{ height: 400 }}
        >
          <AnimatedExpoImage
            sharedTransitionTag={transitionTag}
            source={uri}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              height: "100%",
              width: "100%",
              aspectRatio: parseFloat(width) / parseFloat(height),
              borderRadius: 20,
            }}
          />
        </View>
        <View
          style={{ paddingHorizontal: PARENT_PADDING + 25 }}
          className="mt-20 gap-y-4"
        >
          <Pressable
            className="flex-row items-center gap-x-7 py-5"
            onPress={async () => await share(uri)}
          >
            <ShareIcon color={Colors.icon} />
            <Text color={Colors.icon} className="text-xl">
              Share
            </Text>
          </Pressable>
          <Pressable className="flex-row items-center gap-x-7 py-5">
            <FolderOpenIcon color={Colors.icon} />
            <Text color={Colors.icon} className="text-xl">
              Move to folder
            </Text>
          </Pressable>
          <Pressable className="flex-row items-center gap-x-7 py-5">
            <Trash2Icon color={Colors.redColor} />
            <Text color={Colors.redColor} className="text-xl">
              Delete
            </Text>
          </Pressable>
        </View>
      </AnimatedBlurView>
    </Pressable>
  )
}
