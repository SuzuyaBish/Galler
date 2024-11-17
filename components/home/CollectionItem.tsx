import { Text } from "@/components/StyledComponents"
import { Colors } from "@/constants/colors"
import { Collection } from "@/lib/types/state-types"
import * as Haptics from "expo-haptics"
import { Image } from "expo-image"
import { FC } from "react"
import { Pressable, View } from "react-native"

interface CollectionItemProps extends React.ComponentProps<typeof Pressable> {
  collection: Collection
}

const CollectionItem: FC<CollectionItemProps> = ({ collection, ...props }) => {
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
      {collection.elements.length > 0 ? (
        <Image
          source={collection.elements[0].uri}
          contentFit="cover"
          transition={500}
          style={{
            width: "100%",
            aspectRatio: 1 / 1,
            borderRadius: 10,
          }}
        />
      ) : (
        <View
          style={{
            backgroundColor: Colors.lightMutedBackground,
            width: "100%",
            aspectRatio: 1 / 1,
            borderRadius: 10,
          }}
        />
      )}
      <View>
        <Text
          color={Colors.text}
          family="SwitzerMedium"
          numberOfLines={1}
          className="mt-2"
        >
          {collection.name}
        </Text>
        <Text color={Colors.mutedText} family="SwitzerMedium" numberOfLines={1}>
          {collection.elements.length}{" "}
          {collection.elements.length === 1 ? "element" : "elements"}
        </Text>
      </View>
    </Pressable>
  )
}

export default CollectionItem
