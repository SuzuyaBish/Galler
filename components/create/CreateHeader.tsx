import { Colors } from "@/constants/colors"
import { ChevronLeftIcon } from "lucide-react-native"
import { FC } from "react"
import { Pressable } from "react-native"
import Animated, {
  FadeIn,
  FadeOut,
  FadeOutLeft,
  LinearTransition,
} from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"

interface CreateHeaderProps {
  selectedAction: "folder" | "media" | undefined
  onBack?: () => void
}

const CreateHeader: FC<CreateHeaderProps> = ({ selectedAction, onBack }) => {
  const insets = useSafeAreaInsets()

  return (
    <Animated.View
      layout={LinearTransition.stiffness(1000).damping(500).mass(3)}
      style={[
        {
          marginTop: selectedAction ? 20 : "auto",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          justifyContent: selectedAction ? "space-between" : "flex-start",
        },
      ]}
    >
      {selectedAction && (
        <Pressable onPress={onBack}>
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            <ChevronLeftIcon color={Colors.icon} size={28} strokeWidth={3} />
          </Animated.View>
        </Pressable>
      )}
      <Animated.Text
        entering={FadeIn}
        exiting={FadeOutLeft}
        layout={LinearTransition.stiffness(1000).damping(500).mass(3)}
        className="text-xl"
        style={[
          {
            color: Colors.icon,
            fontFamily: "SatoshiBold",
          },
        ]}
      >
        {selectedAction
          ? selectedAction === "folder"
            ? "Create Folder"
            : "Select Media"
          : "Step 1"}
      </Animated.Text>
      <Animated.View>
        <ChevronLeftIcon color={"transparent"} size={28} strokeWidth={3} />
      </Animated.View>
    </Animated.View>
  )
}

export default CreateHeader
