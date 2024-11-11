import { Text } from "@/components/StyledComponents"
import { Colors } from "@/constants/colors"
import { PARENT_PADDING, WINDOW_WIDTH } from "@/constants/dimensions"
import { BlurView } from "expo-blur"
import { Image } from "expo-image"
import { SquircleView } from "expo-squircle-view"
import { FC } from "react"
import { Pressable, useColorScheme } from "react-native"
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated"

interface FolderItemProps extends React.ComponentProps<typeof Pressable> {
  title: string
}

const FolderItem: FC<FolderItemProps> = ({ ...props }) => {
  const colorscheme = useColorScheme()
  const colors = Colors[colorscheme ?? "light"]
  return (
    <Pressable {...props}>
      <Animated.View
        layout={LinearTransition}
        entering={FadeIn}
        exiting={FadeOut}
      >
        <SquircleView
          borderRadius={20}
          style={{
            height: WINDOW_WIDTH / 2 - PARENT_PADDING - PARENT_PADDING / 2,
            width: WINDOW_WIDTH / 2 - PARENT_PADDING - PARENT_PADDING / 2,
            overflow: "hidden",
            backgroundColor: colors.lightMutedText,
          }}
        >
          <Image
            source={require("../../assets/images/img.jpeg")}
            contentFit="cover"
            style={{
              height: WINDOW_WIDTH / 2 - PARENT_PADDING - PARENT_PADDING / 2,
              width: WINDOW_WIDTH / 2 - PARENT_PADDING - PARENT_PADDING / 2,
            }}
          >
            <BlurView
              className="m-4 mt-auto flex items-center justify-center overflow-hidden rounded-full border px-2 py-1.5"
              style={{
                borderColor: colors.lightMutedText,
              }}
              intensity={20}
              experimentalBlurMethod="dimezisBlurView"
            >
              <Text color="white" family="SatoshiBlack" numberOfLines={1}>
                {props.title}
              </Text>
            </BlurView>
          </Image>
        </SquircleView>
      </Animated.View>
    </Pressable>
  )
}

export default FolderItem
