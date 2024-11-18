import { Colors } from "@/constants/colors"
import * as Haptics from "expo-haptics"
import { Image } from "expo-image"
import { FC } from "react"
import { Pressable } from "react-native"
import Animated, {
  FadeIn,
  LinearTransition,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated"

interface FolderItemProps extends React.ComponentProps<typeof Pressable> {
  image: string
  rowCount?: number
  isSelected?: boolean
  transitionTag?: string
}

const AnimatedImage = Animated.createAnimatedComponent(Image)

const ListItem: FC<FolderItemProps> = ({ rowCount = 2, ...props }) => {
  const animatedStyle = useAnimatedStyle(() => ({
    borderWidth: props.isSelected ? withTiming(4) : withTiming(0),
    padding: props.isSelected ? withTiming(4) : withTiming(0),
  }))

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
        style={[
          animatedStyle,
          {
            width: "100%",
            borderColor: Colors.redColor,
          },
        ]}
      >
        <AnimatedImage
          source={props.image}
          contentFit="cover"
          transition={500}
          sharedTransitionTag={props.transitionTag}
          style={{
            aspectRatio: 1 / 1,
            borderRadius: 10,
          }}
        />
      </Animated.View>
    </Pressable>
  )
}

export default ListItem
