import { Text } from "@/components/StyledComponents"
import { Colors } from "@/constants/colors"
import React from "react"
import Animated, { FadeIn, FadeOut } from "react-native-reanimated"
import FolderIcon from "../icons/FolderIcon"
import ImageIcon from "../icons/ImageIcon"

export default function CreateTitle({ canShow }: { canShow: boolean }) {
  if (canShow) {
    return (
      <Animated.View
        exiting={FadeOut}
        entering={FadeIn.delay(200)}
        className="flex flex-row flex-wrap items-center gap-x-2"
      >
        <Text className="text-4xl" family="SatoshiBold">
          Create a
        </Text>
        <FolderIcon color={Colors.icon} height={30} width={30} />
        <Text className="text-4xl" family="SatoshiBold">
          folder
        </Text>
        <Text className="text-4xl" family="SatoshiBold">
          or add some media
        </Text>
        <ImageIcon color={Colors.icon} height={30} width={30} />
      </Animated.View>
    )
  }
}
