import { Text } from "@/components/StyledComponents"
import { Colors } from "@/constants/colors"
import { PARENT_PADDING, WINDOW_WIDTH } from "@/constants/dimensions"
import * as Haptics from "expo-haptics"
import { Image } from "expo-image"
import * as MediaLibrary from "expo-media-library"
import { SquircleView } from "expo-squircle-view"
import { FC } from "react"
import { Pressable, useColorScheme } from "react-native"
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated"
import useSWR from "swr"

interface FolderItemProps extends React.ComponentProps<typeof Pressable> {
  album: MediaLibrary.Album
}

const AlbumItem: FC<FolderItemProps> = ({ album, ...props }) => {
  const colorscheme = useColorScheme()
  const colors = Colors[colorscheme ?? "light"]
  const fetcher = async () =>
    await MediaLibrary.getAssetsAsync({ album: album })
  const { data } = useSWR(`assets/${album.id}`, fetcher)

  if (data && data.assets.length > 0) {
    return (
      <Pressable
        {...props}
        className="transition-all duration-200 active:scale-95"
        style={{
          width: WINDOW_WIDTH / 2 - PARENT_PADDING - PARENT_PADDING / 2,
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
        >
          <SquircleView
            borderRadius={14}
            style={{
              height: WINDOW_WIDTH / 2 - PARENT_PADDING - PARENT_PADDING / 2,
              width: WINDOW_WIDTH / 2 - PARENT_PADDING - PARENT_PADDING / 2,
              overflow: "hidden",
              backgroundColor: colors.lightMutedText,
            }}
          >
            <Image
              source={{
                uri: data.assets[0].uri,
              }}
              contentFit="cover"
              style={{
                height: WINDOW_WIDTH / 2 - PARENT_PADDING - PARENT_PADDING / 2,
                width: WINDOW_WIDTH / 2 - PARENT_PADDING - PARENT_PADDING / 2,
              }}
            ></Image>
          </SquircleView>
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            <Text color="white" className="text-center" family="SatoshiBlack">
              {album.title}
            </Text>
          </Animated.View>
        </Animated.View>
      </Pressable>
    )
  }
}

export default AlbumItem
