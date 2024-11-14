import { Text } from "@/components/StyledComponents"
import { Colors } from "@/constants/colors"
import { PARENT_PADDING, WINDOW_WIDTH } from "@/constants/dimensions"
import * as Haptics from "expo-haptics"
import { Image } from "expo-image"
import { FC } from "react"
import { Pressable, View } from "react-native"
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated"

interface FolderItemProps extends React.ComponentProps<typeof Pressable> {
  title?: string
  image: string
  rowCount?: number
  isSelected?: boolean
}

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
        exiting={FadeOut}
        style={[
          animatedStyle,
          {
            width:
              WINDOW_WIDTH / rowCount - PARENT_PADDING - PARENT_PADDING / 2,
            borderColor: Colors.redColor,
          },
        ]}
      >
        <Image
          source={props.image}
          contentFit="cover"
          transition={500}
          style={{
            aspectRatio: 1 / 1,
          }}
        />
        {props.title && (
          <View>
            <Text
              color={Colors.text}
              family="SatoshiMedium"
              numberOfLines={1}
              className="mt-2"
            >
              {props.title}
            </Text>
            <Text
              color={Colors.mutedText}
              family="SatoshiMedium"
              numberOfLines={1}
            >
              133 elements
            </Text>
          </View>
        )}
      </Animated.View>
    </Pressable>
  )
}

export default ListItem
