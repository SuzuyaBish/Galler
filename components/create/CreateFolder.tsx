import { Text } from "@/components/StyledComponents"
import { Colors } from "@/constants/colors"
import { state$ } from "@/lib/store/state"
import { BottomSheetTextInput } from "@gorhom/bottom-sheet"
import { ChevronLeftIcon, PlusIcon } from "lucide-react-native"
import React, { useState } from "react"
import { Pressable, View } from "react-native"

export default function CreateFolder({ onBack }: { onBack: () => void }) {
  const [name, setName] = useState("")
  return (
    <View>
      <View
        className="flex flex-row items-center justify-between border-b pb-5"
        style={{ borderColor: Colors.lightMutedBackground }}
      >
        <Pressable
          onPress={onBack}
          className="rounded-full p-3"
          style={{ backgroundColor: Colors.lightMutedBackground }}
        >
          <ChevronLeftIcon color={Colors.icon} />
        </Pressable>
        <Text className="text-2xl" family="Gambarino">
          Create Folder
        </Text>
        <Pressable
          className="rounded-full p-3"
          onPress={() => {
            if (name.length > 0) {
              state$.createFolder(name)
              onBack()
            }
          }}
          style={{
            backgroundColor:
              name.length > 0 ? Colors.lightMutedBackground : "transparent",
          }}
        >
          <PlusIcon color={name.length > 0 ? Colors.icon : "transparent"} />
        </Pressable>
      </View>
      <View className="mt-5">
        <BottomSheetTextInput
          placeholder="Collection Name*"
          placeholderTextColor={Colors.mutedText}
          autoFocus
          className="rounded-full px-7 py-5"
          value={name}
          onChangeText={setName}
          style={{
            backgroundColor: Colors.lightMutedBackground,
            fontSize: 16,
            fontFamily: "SwitzerMedium",
            color: "white",
          }}
        />
      </View>
    </View>
  )
}
