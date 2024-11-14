import { Colors } from "@/constants/colors"
import * as Haptics from "expo-haptics"
import * as MediaLibrary from "expo-media-library"
import React, { useState } from "react"
import Animated, { FadeIn, LinearTransition } from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import FolderIcon from "../icons/FolderIcon"
import ImageIcon from "../icons/ImageIcon"
import AlbumViewer from "./AlbumViewer"
import CreateAction from "./CreateAction"
import CreateHeader from "./CreateHeader"
import CreateTitle from "./CreateTitle"

export default function CreateLanding() {
  const insets = useSafeAreaInsets()
  const [selectedAction, setSelectedAction] = useState<
    "folder" | "media" | undefined
  >()
  const [selectedAlbum, setSelectedAlbum] = useState<MediaLibrary.Album | null>(
    null
  )
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions()

  return (
    <Animated.View
      layout={LinearTransition.stiffness(1000).damping(500).mass(3)}
      entering={FadeIn.delay(300)}
      className="flex-1 gap-y-2"
    >
      <CreateHeader
        selectedAction={selectedAction}
        onBack={() => {
          if (selectedAction === "media") {
            if (selectedAlbum) {
              setSelectedAlbum(null)
            } else {
              setSelectedAction(undefined)
            }
          }
        }}
      />

      {selectedAction === "media" && (
        <AlbumViewer
          selectedAlbum={selectedAlbum}
          setSelectedAlbum={setSelectedAlbum}
        />
      )}

      <CreateTitle canShow={!selectedAction} />

      {!selectedAction && (
        <CreateAction
          title="Folder"
          icon={<FolderIcon color={Colors.icon} height={24} width={24} />}
          currentAction={selectedAction}
          onPress={() => {
            setSelectedAction("folder")
          }}
        />
      )}
      {!selectedAction && (
        <CreateAction
          title="Media"
          icon={<ImageIcon color={Colors.icon} height={24} width={24} />}
          className="mt-1"
          style={{ paddingBottom: insets.bottom }}
          currentAction={selectedAction}
          onPress={async () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)

            if (permissionResponse?.status !== "granted") {
              const response = await requestPermission()

              if (response.granted) {
                setSelectedAction("media")
              }
            } else {
              setSelectedAction("media")
            }
          }}
        />
      )}
    </Animated.View>
  )
}
