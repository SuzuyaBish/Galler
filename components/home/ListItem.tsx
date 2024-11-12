import { Text } from "@/components/StyledComponents"
import { Colors } from "@/constants/colors"
import { PARENT_PADDING, WINDOW_WIDTH } from "@/constants/dimensions"
import { BlurView } from "expo-blur"
import * as Haptics from "expo-haptics"
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
  title?: string
  image: string
}

const ListItem: FC<FolderItemProps> = ({ ...props }) => {
  const colorscheme = useColorScheme()
  const colors = Colors[colorscheme ?? "light"]
  return (
    <Pressable
      {...props}
      className="transition-all duration-200 active:scale-95"
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        if (props.onPress) {
          // @ts-ignore
          props.onPress()
        }
      }}
    >
      <Animated.View
        layout={LinearTransition}
        entering={FadeIn}
        exiting={FadeOut}
      >
        <SquircleView
          borderRadius={14}
          style={{
            height: WINDOW_WIDTH / 2 - PARENT_PADDING - PARENT_PADDING / 2,
            width: WINDOW_WIDTH / 2 - PARENT_PADDING - PARENT_PADDING / 2,
            overflow: "hidden",
            backgroundColor: colors.lightMutedText,
          }}
        >
          <Image
            source={props.image}
            contentFit="cover"
            style={{
              height: WINDOW_WIDTH / 2 - PARENT_PADDING - PARENT_PADDING / 2,
              width: WINDOW_WIDTH / 2 - PARENT_PADDING - PARENT_PADDING / 2,
            }}
          >
            {props.title && (
              <Animated.View
                entering={FadeIn}
                exiting={FadeOut}
                className="mt-auto"
              >
                <BlurView
                  className="m-4 flex items-center justify-center overflow-hidden rounded-full border px-2 py-1.5"
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
              </Animated.View>
            )}
          </Image>
        </SquircleView>
      </Animated.View>
    </Pressable>
  )
}

export default ListItem
