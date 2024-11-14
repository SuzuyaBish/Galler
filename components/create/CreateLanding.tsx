import { Colors } from "@/constants/colors"
import { createState$ } from "@/lib/store/create-store"
import { observer } from "@legendapp/state/react"
import * as Haptics from "expo-haptics"
import * as MediaLibrary from "expo-media-library"
import React from "react"
import Animated, { FadeIn, LinearTransition } from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import FolderIcon from "../icons/FolderIcon"
import ImageIcon from "../icons/ImageIcon"
import AlbumViewer from "./AlbumViewer"
import CreateAction from "./CreateAction"
import CreateHeader from "./CreateHeader"
import CreateTitle from "./CreateTitle"

function CreateLanding() {
  const insets = useSafeAreaInsets()
  const selectedAction = createState$.selectedAction.get()

  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions()

  return (
    <Animated.View
      layout={LinearTransition.stiffness(1000).damping(500).mass(3)}
      entering={FadeIn.delay(300)}
      className="flex-1 gap-y-2"
    >
      <CreateHeader />

      {selectedAction === "media" && <AlbumViewer />}

      <CreateTitle canShow={selectedAction !== "step1"} />

      {selectedAction === "step1" && (
        <CreateAction
          title="Folder"
          icon={<FolderIcon color={Colors.icon} height={24} width={24} />}
          onPress={() => {
            createState$.selectedAction.set("folder")
          }}
        />
      )}
      {selectedAction === "step1" && (
        <CreateAction
          title="Media"
          icon={<ImageIcon color={Colors.icon} height={24} width={24} />}
          className="mt-1"
          style={{ paddingBottom: insets.bottom }}
          onPress={async () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)

            if (permissionResponse?.status !== "granted") {
              const response = await requestPermission()

              if (response.granted) {
                createState$.selectedAction.set("media")
              }
            } else {
              createState$.selectedAction.set("media")
            }
          }}
        />
      )}
    </Animated.View>
  )
}

export default observer(CreateLanding)
