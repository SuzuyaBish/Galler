import { Colors } from "@/constants/colors"
import * as Haptics from "expo-haptics"
import { ChevronLeftIcon } from "lucide-react-native"
import { FC } from "react"
import { Pressable, View, useColorScheme } from "react-native"
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated"

type HeaderWithBackButtonProps = {
  hasBackButton: true
  onBackPress: () => void
}

type HeaderWithoutBackButtonProps = {
  hasBackButton: false
}

type HeaderProps = {
  title: string
} & (HeaderWithBackButtonProps | HeaderWithoutBackButtonProps)

const Header: FC<HeaderProps> = ({ title, ...props }) => {
  const colorscheme = useColorScheme()
  const colors = Colors[colorscheme ?? "light"]
  return (
    <Pressable
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        props.onBackPress()
      }}
      className="flex flex-row items-center gap-x-3 transition-all duration-200 active:scale-95"
      style={{ marginTop: 30 }}
    >
      {props.hasBackButton && (
        <Animated.View entering={FadeIn} exiting={FadeOut}>
          <Pressable
            onPress={() => {
              props.onBackPress()
            }}
          >
            <ChevronLeftIcon color={colors.icon} size={32} strokeWidth={3} />
          </Pressable>
        </Animated.View>
      )}
      <Animated.View
        layout={LinearTransition}
        className="flex flex-row items-center gap-x-3"
      >
        <Animated.Text
          className="text-4xl"
          exiting={FadeOut}
          entering={FadeIn}
          layout={LinearTransition}
          style={{
            fontFamily: "SatoshiBold",
            color: colors.text,
          }}
        >
          {title}
        </Animated.Text>
        <View
          className="size-4 rounded-full"
          style={{ backgroundColor: colors.redColor }}
        />
      </Animated.View>
    </Pressable>
  )
}

export default Header
