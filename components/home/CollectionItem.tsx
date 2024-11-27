import { Text } from "@/components/StyledComponents"
import { Colors } from "@/constants/colors"
import { Collection } from "@/lib/types/state-types"
import { BlurView } from "expo-blur"
import * as Haptics from "expo-haptics"
import { Image } from "expo-image"
import { FC } from "react"
import { Pressable, View } from "react-native"
import { Triangle, TriangleParent } from "../icons/Triangle"

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
      <View>
        <BlurView
          intensity={100}
          className="absolute bottom-0 left-0 right-0 top-0 z-10 flex justify-end p-5"
          tint="dark"
          experimentalBlurMethod="dimezisBlurView"
          style={{
            width: "100%",
            aspectRatio: 1 / 1,
            borderRadius: 14,
            overflow: "hidden",
            borderColor: Colors.mutedBackground,
            borderWidth: 1,
          }}
        >
          {collection.elements.length > 0 && (
            <View
              style={{ position: "absolute", right: 0, top: 0, zIndex: 10 }}
            >
              <TriangleParent>
                <Triangle imageUri={collection.elements[0].uri} offsetTop={0} />
              </TriangleParent>
            </View>
          )}
          <View>
            <Text numberOfLines={1} className="text-2xl" family="SwitzerBold">
              {collection.name}
            </Text>
            <View>
              <Text className="text-sm" color={Colors.mutedText}>
                {collection.elements.length}{" "}
                {collection.elements.length === 1 ? "element" : "elements"}
              </Text>
            </View>
          </View>
        </BlurView>
        {collection.elements.length > 0 ? (
          <Image
            source={collection.elements[0].uri}
            contentFit="cover"
            transition={500}
            style={{
              width: "100%",
              aspectRatio: 1 / 1,
              borderRadius: 14,
            }}
          />
        ) : (
          <View
            style={{
              width: "100%",
              aspectRatio: 1 / 1,
              borderRadius: 14,
            }}
          />
        )}
      </View>
    </Pressable>
  )
}

export default CollectionItem
