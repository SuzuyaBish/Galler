import { Colors } from "@/constants/colors"
import { PARENT_PADDING } from "@/constants/dimensions"
import { state$ } from "@/lib/store/state"
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet"
import { observer } from "@legendapp/state/react"
import * as ImagePicker from "expo-image-picker"
import React, { useRef } from "react"
import Animated, { FadeIn, LinearTransition } from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import FolderIcon from "../icons/FolderIcon"
import ImageIcon from "../icons/ImageIcon"
import CreateFolder from "./CreateFolder"
import CreateOption from "./CreateOption"

function CreateLanding({ onDone }: { onDone: () => void }) {
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const insets = useSafeAreaInsets()

  const selectElements = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsMultipleSelection: true,
    })

    if (!result.canceled) {
      await state$.createElement(result.assets).then(() => {
        onDone()
      })
    }
  }
  return (
    <Animated.View
      layout={LinearTransition.stiffness(1000).damping(500).mass(3)}
      entering={FadeIn.delay(300)}
      className="flex-1 gap-y-2 rounded-3xl"
      style={{}}
    >
      <CreateOption
        icon={<ImageIcon color={Colors.icon} height={18} width={18} />}
        title="Elements"
        subtitle="Images or videos"
        onPress={selectElements}
      />
      <CreateOption
        icon={<FolderIcon color={Colors.icon} height={18} width={18} />}
        title="Collection"
        subtitle="Folder for elements"
        onPress={() => bottomSheetRef.current?.present()}
      />

      <BottomSheetModal
        ref={bottomSheetRef}
        enableDynamicSizing
        handleStyle={{
          paddingBottom: 0,
        }}
        handleIndicatorStyle={{
          backgroundColor: Colors.mutedText,
        }}
        animationConfigs={{
          stiffness: 1000,
          damping: 500,
          mass: 3,
        }}
        backgroundStyle={{
          backgroundColor: Colors.mutedBackground,
          borderRadius: 22,
        }}
        backdropComponent={(e) => {
          return (
            <BottomSheetBackdrop
              onPress={() => bottomSheetRef.current?.dismiss()}
              appearsOnIndex={0}
              disappearsOnIndex={-1}
              style={[e.style, { backgroundColor: "rgba(0,0,0,0.6)" }]}
              animatedIndex={e.animatedIndex}
              animatedPosition={e.animatedPosition}
            />
          )
        }}
      >
        <BottomSheetView
          className="flex-1"
          style={{
            paddingHorizontal: PARENT_PADDING + 5,
            paddingVertical: PARENT_PADDING,
          }}
        >
          <CreateFolder
            onBack={(isDone) => {
              if (isDone) {
                onDone()
                bottomSheetRef.current?.dismiss()
              } else {
                bottomSheetRef.current?.dismiss()
              }
            }}
          />
        </BottomSheetView>
      </BottomSheetModal>
    </Animated.View>
  )
}

export default observer(CreateLanding)
