import { PARENT_PADDING, WINDOW_WIDTH } from "@/constants/dimensions"
import type { Element } from "@/lib/types/state-types"
import { MasonryFlashList } from "@shopify/flash-list"
import { Image } from "expo-image"
import { useRouter } from "expo-router"
import { FC } from "react"
import { Pressable } from "react-native"

const COLUMN_GAP = 16
const ITEM_WIDTH = (WINDOW_WIDTH - PARENT_PADDING * 2 - COLUMN_GAP) / 2

interface MasonryElementListProps {
  elements: Element[]
  scrollEnabled?: boolean
  onPress?: (element: Element) => void
  enableNavigation?: boolean
}

const MasonryElementList: FC<MasonryElementListProps> = ({
  elements,
  scrollEnabled = true,
  onPress,
  enableNavigation = true,
}) => {
  const router = useRouter()
  return (
    <MasonryFlashList
      data={elements}
      numColumns={2}
      contentContainerStyle={{
        paddingHorizontal: PARENT_PADDING,
      }}
      renderItem={({ item, index }) => (
        <Pressable
          onPress={() => {
            if (onPress) {
              onPress(item)
            } else if (enableNavigation) {
              router.push({
                pathname: "/viewer",
                params: {
                  transitionTag: `element-${item.id}`,
                  id: item.id,
                  fromHome: "false",
                },
              })
            }
          }}
        >
          <Image
            source={item.uri}
            style={{
              width: ITEM_WIDTH,
              height: "auto",
              aspectRatio: item.width / item.height,
              marginLeft: index % 2 === 0 ? 0 : COLUMN_GAP,
              marginBottom: COLUMN_GAP,
            }}
          />
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
      estimatedItemSize={ITEM_WIDTH + 2}
      scrollEnabled={scrollEnabled}
    />
  )
}

export default MasonryElementList
