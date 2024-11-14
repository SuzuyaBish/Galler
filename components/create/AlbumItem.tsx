import { Text } from "@/components/StyledComponents"
import { Colors } from "@/constants/colors"
import * as Haptics from "expo-haptics"
import { Image } from "expo-image"
import * as MediaLibrary from "expo-media-library"
import { FC } from "react"
import { Pressable, View } from "react-native"
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated"
import useSWR from "swr"

interface FolderItemProps extends React.ComponentProps<typeof Pressable> {
  album: MediaLibrary.Album
  rowCount: number
}

const AlbumItem: FC<FolderItemProps> = ({ album, rowCount, ...props }) => {
  const fetcher = async () =>
    await MediaLibrary.getAssetsAsync({ album: album })
  const { data } = useSWR(`assets/${album.id}`, fetcher)

  if (data && data.assets.length > 0) {
    return (
      <Pressable
        {...props}
        className="transition-all duration-200 active:scale-95"
        style={{
          aspectRatio: 1 / 1,
          width: "48%",
        }}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
          if (props.onPress) {
            // @ts-ignore
            props.onPress()
          }
        }}
      >
        <Animated.View
          layout={LinearTransition}
          entering={FadeIn}
          exiting={FadeOut}
          style={{
            width: "100%",
          }}
        >
          <Image
            source={data.assets[0].uri}
            contentFit="cover"
            transition={500}
            style={{
              aspectRatio: 1 / 1,
              width: "100%",
            }}
          />
          {album.title && (
            <View>
              <Text
                color={Colors.text}
                family="SatoshiMedium"
                numberOfLines={1}
                className="mt-2"
              >
                {album.title}
              </Text>
              <Text
                color={Colors.mutedText}
                family="SatoshiMedium"
                numberOfLines={1}
                className="text-sm"
              >
                {album.assetCount} elements
              </Text>
            </View>
          )}
        </Animated.View>
      </Pressable>
    )
  }
}

export default AlbumItem
