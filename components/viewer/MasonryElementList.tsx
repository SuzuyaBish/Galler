import { PARENT_PADDING, WINDOW_WIDTH } from "@/constants/dimensions"
import type { Element } from "@/lib/types/state-types"
import { MasonryFlashList } from "@shopify/flash-list"
import { Image } from "expo-image"
import { FC } from "react"

const COLUMN_GAP = 16
const ITEM_WIDTH = (WINDOW_WIDTH - PARENT_PADDING * 2 - COLUMN_GAP) / 2

interface MasonryElementListProps {
  elements: Element[]
  scrollEnabled?: boolean
}

const MasonryElementList: FC<MasonryElementListProps> = ({
  elements,
  scrollEnabled = true,
}) => {
  return (
    <MasonryFlashList
      data={elements}
      numColumns={2}
      contentContainerStyle={{
        paddingHorizontal: PARENT_PADDING,
      }}
      renderItem={({ item, index }) => (
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
      )}
      keyExtractor={(item) => item.id}
      estimatedItemSize={ITEM_WIDTH + 2}
    />
  )
}

export default MasonryElementList
