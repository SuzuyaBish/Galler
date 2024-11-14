import { Colors } from "@/constants/colors"
import { cn } from "@/lib/utils"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react-native"
import { FC } from "react"
import { Pressable } from "react-native"
import Animated, {
  FadeIn,
  FadeInUp,
  FadeOut,
  FadeOutDown,
  LinearTransition,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated"

interface CreateActionProps extends React.ComponentProps<typeof Pressable> {
  title: string
  icon: React.ReactNode
}

const CreateAction: FC<CreateActionProps> = ({ title, icon, ...props }) => {
  const animateButton = useAnimatedStyle(() => {
    return {
      backgroundColor: currentAction
        ? withTiming(Colors.background, { duration: 200 })
        : withTiming(Colors.lightMutedBackground, { duration: 200 }),
    }
  })
  return (
    <Animated.View entering={FadeInUp} exiting={FadeOutDown}>
      <Pressable {...props} className={cn("mt-5", props.className)}>
        <Animated.View
          className="rounded-3xl"
          layout={LinearTransition.stiffness(1000).damping(500).mass(3)}
          style={[
            animateButton,
            {
              padding: 22,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            },
          ]}
        >
          {currentAction && (
            <Animated.View
              layout={LinearTransition.stiffness(1000).damping(500).mass(3)}
              entering={FadeIn}
              exiting={FadeOut}
            >
              <ChevronLeftIcon color="transparent" size={24} />
            </Animated.View>
          )}
          <Animated.Text
            layout={LinearTransition.stiffness(1000).damping(500).mass(3)}
            entering={FadeIn}
            exiting={FadeOut}
            className="text-2xl"
            style={{
              fontFamily: "SatoshiBold",
              color: "white",
            }}
          >
            {currentAction && "Import"} {title}
          </Animated.Text>
          {currentAction ? (
            <Animated.View entering={FadeIn} exiting={FadeOut}>
              <ChevronRightIcon color={Colors.icon} size={24} />
            </Animated.View>
          ) : (
            <Animated.View entering={FadeIn} exiting={FadeOut}>
              {icon}
            </Animated.View>
          )}
        </Animated.View>
      </Pressable>
    </Animated.View>
  )
}

export default CreateAction
