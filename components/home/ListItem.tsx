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
} from "react-native-reanimated"

interface FolderItemProps extends React.ComponentProps<typeof Pressable> {
  title?: string
  image: string
  rowCount?: number
}

const ListItem: FC<FolderItemProps> = ({ rowCount = 2, ...props }) => {
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
        style={{
          width: WINDOW_WIDTH / rowCount - PARENT_PADDING - PARENT_PADDING / 2,
        }}
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
