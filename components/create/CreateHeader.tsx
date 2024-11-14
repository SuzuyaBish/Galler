import { Colors } from "@/constants/colors"
import { createState$ } from "@/lib/store/create-store"
import { observer } from "@legendapp/state/react"
import { ChevronLeftIcon } from "lucide-react-native"
import { FC } from "react"
import { Pressable } from "react-native"
import Animated, {
  FadeIn,
  FadeOut,
  FadeOutLeft,
  LinearTransition,
} from "react-native-reanimated"
import { Text } from "../StyledComponents"

interface CreateHeaderProps {}

const CreateHeader: FC<CreateHeaderProps> = ({}) => {
  const selectedAlbum = createState$.selectedAlbum.get()
  const selectedAction = createState$.selectedAction.get()
  const totalSelected = createState$.selectedAssets.get().length
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
        <Pressable
          onPress={() => {
            if (selectedAlbum) {
              createState$.selectedAlbum.set(undefined)
            } else {
              createState$.setDefault()
            }
          }}
        >
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
        <Text
          style={{
            color: selectedAction === "step1" ? "transparent" : Colors.icon,
          }}
        >
          {totalSelected}
        </Text>
      </Animated.View>
    </Animated.View>
  )
}

export default observer(CreateHeader)
