import Header from "@/components/Header"
import { ParentView } from "@/components/StyledComponents"
import ListItem from "@/components/home/ListItem"
import { PARENT_PADDING, TAB_BAR_HEIGHT } from "@/constants/dimensions"
import { useState } from "react"
import { ScrollView, View } from "react-native"
import Animated, { FadeIn, FadeOut } from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const folders = [{ id: 0, image: require("../assets/images/img.jpeg") }]

const images = [
  { id: 0, image: require("../assets/images/img.jpeg") },
  { id: 1, image: require("../assets/images/img2.jpeg") },
  { id: 2, image: require("../assets/images/img3.png") },
]

export default function HomeScreen() {
  const insets = useSafeAreaInsets()
  const [list, setList] = useState(folders)

  // if (arraySize === 0) {
  //   return <HomeEmptyView />
  // }

  return (
    <Animated.View className="flex-1" entering={FadeIn} exiting={FadeOut}>
      <ParentView
        hasInsets
        extraInsets={false}
        padding={{
          left: true,
          right: true,
        }}
      >
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: insets.bottom + TAB_BAR_HEIGHT,
          }}
        >
          <Header
            title={list === folders ? "Folders" : "Images"}
            hasBackButton={list === images}
            onBackPress={() => {
              setList(folders)
            }}
          />
          <View
            className="mt-10 flex flex-row flex-wrap justify-between"
            style={{ rowGap: PARENT_PADDING }}
          >
            {list.map((image) => {
              return (
                <ListItem
                  key={image.id}
                  title={list === folders ? "Cool" : undefined}
                  image={image.image}
                  onPress={() => setList(images)}
                />
              )
            })}
          </View>
        </ScrollView>
      </ParentView>
    </Animated.View>
  )
}
