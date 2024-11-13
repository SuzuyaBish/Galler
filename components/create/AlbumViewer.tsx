import { PARENT_PADDING } from "@/constants/dimensions"
import { BottomSheetScrollView } from "@gorhom/bottom-sheet"
import * as MediaLibrary from "expo-media-library"
import { FC } from "react"
import Animated, { FadeIn, FadeOut } from "react-native-reanimated"
import useSWR from "swr"
import AlbumItem from "./AlbumItem"

interface AlbumViewerProps {}

const AlbumViewer: FC<AlbumViewerProps> = ({}) => {
  async function getAlbums() {
    const albums = await MediaLibrary.getAlbumsAsync({
      includeSmartAlbums: true,
    })

    return albums
  }
  const { data } = useSWR("albums", getAlbums)

  if (data) {
    return (
      <BottomSheetScrollView showsVerticalScrollIndicator={false}>
        <Animated.View
          entering={FadeIn.delay(300)}
          exiting={FadeOut}
          className="my-10 flex flex-row flex-wrap justify-between"
          style={{ rowGap: PARENT_PADDING }}
        >
          {data.map((album) => {
            return <AlbumItem album={album} key={album.id} />
          })}
        </Animated.View>
      </BottomSheetScrollView>
    )
  }
}

export default AlbumViewer
