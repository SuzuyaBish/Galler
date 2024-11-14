import { PARENT_PADDING } from "@/constants/dimensions"
import { BottomSheetFlatList } from "@gorhom/bottom-sheet"
import * as MediaLibrary from "expo-media-library"
import { FC, useEffect, useState } from "react"
import { View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import useSWR from "swr"
import ListItem from "../home/ListItem"
import AlbumItem from "./AlbumItem"

interface AlbumViewerProps {
  selectedAlbum: MediaLibrary.Album | null
  setSelectedAlbum: (album: MediaLibrary.Album | null) => void
}

const AlbumViewer: FC<AlbumViewerProps> = ({
  selectedAlbum,
  setSelectedAlbum,
}) => {
  const insets = useSafeAreaInsets()
  const [assets, setAssets] =
    useState<MediaLibrary.PagedInfo<MediaLibrary.Asset>>()

  async function getAlbums() {
    const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
      includeSmartAlbums: true,
    })

    const albums: MediaLibrary.Album[] = []
    for (const album of fetchedAlbums) {
      const assets = await MediaLibrary.getAssetsAsync({ album: album })
      if (assets.assets.length > 0) {
        albums.push(album)
      }
    }
    return albums
  }

  async function getAlbumAssets(
    album: MediaLibrary.Album,
    endCursor?: MediaLibrary.AssetRef
  ) {
    const assets = await MediaLibrary.getAssetsAsync({
      album: album,
      after: endCursor,
    })
    return assets
  }

  const { data } = useSWR("albums", getAlbums)

  useEffect(() => {
    if (selectedAlbum) {
      getAlbumAssets(selectedAlbum).then((assets) => {
        setAssets(assets)
      })
    }
  }, [selectedAlbum])

  return (
    <View className="flex-1">
      {!selectedAlbum && (
        <BottomSheetFlatList
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          className="mt-5"
          numColumns={2}
          data={data}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginBottom: PARENT_PADDING + 50,
          }}
          contentContainerStyle={{
            paddingBottom: insets.bottom,
          }}
          renderItem={({ item }) => (
            <AlbumItem
              album={item}
              rowCount={2}
              onPress={() => setSelectedAlbum(item)}
            />
          )}
        />
      )}
      {selectedAlbum && (
        <BottomSheetFlatList
          onEndReachedThreshold={0.5}
          style={{ flex: 1 }}
          className="mt-5"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: insets.bottom,
          }}
          onEndReached={async () => {
            if (selectedAlbum && assets?.endCursor && assets?.hasNextPage) {
              await getAlbumAssets(selectedAlbum, assets?.endCursor).then(
                (currentAssets) => {
                  setAssets({
                    assets: [...assets.assets, ...currentAssets.assets],
                    endCursor: currentAssets.endCursor,
                    hasNextPage: currentAssets.hasNextPage,
                    totalCount: currentAssets.totalCount,
                  })
                }
              )
            }
          }}
          numColumns={3}
          data={assets?.assets}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginBottom: PARENT_PADDING,
          }}
          renderItem={({ item }) => <ListItem image={item.uri} rowCount={3} />}
        />
      )}
    </View>
  )
}

export default AlbumViewer
