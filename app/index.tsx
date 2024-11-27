import CollectionItem from "@/components/home/CollectionItem"
import ListItem from "@/components/home/ListItem"
import { ParentView, Text } from "@/components/StyledComponents"
import { Colors } from "@/constants/colors"
import { PARENT_PADDING, WINDOW_WIDTH } from "@/constants/dimensions"
import { state$ } from "@/lib/store/state"
import { sortElementsByDate } from "@/lib/utils"
import { observer } from "@legendapp/state/react"
import * as Haptics from "expo-haptics"
import { useRouter } from "expo-router"
import { useState } from "react"
import { Pressable, ScrollView, View } from "react-native"
import Animated, {
  FadeIn,
  FadeInLeft,
  FadeOut,
  FadeOutRight,
} from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { SimpleGrid } from "react-native-super-grid"

const AnimatedGrid = Animated.createAnimatedComponent(SimpleGrid)

function HomeScreen() {
  const insets = useSafeAreaInsets()
  const elements = state$.elements.get()
  const folders = state$.getFoldersWithElements()
  const router = useRouter()
  const [collectionsSelected, setCollectionsSelected] = useState(true)

  // if (arraySize === 0) {
  //   return <HomeEmptyView />
  // }

  return (
    <Animated.View className="flex-1" entering={FadeIn} exiting={FadeOut}>
      <ParentView
        extraInsets={false}
        padding={{
          left: true,
          right: true,
          bottom: true,
          top: false,
        }}
      >
        <View
          className="mb-5 flex-row items-center gap-x-5"
          style={{
            paddingTop: insets.top + 20,
          }}
        >
          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
              setCollectionsSelected(true)
            }}
          >
            <Text
              color={collectionsSelected ? "white" : Colors.icon}
              className="pl-4 text-2xl"
              family="Gambarino"
            >
              Collections
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
              setCollectionsSelected(false)
            }}
          >
            <Text
              color={collectionsSelected ? Colors.icon : "white"}
              className="text-2xl"
              family="Gambarino"
            >
              Elements
            </Text>
          </Pressable>
        </View>
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{}}
        >
          {elements.length > 0 && !collectionsSelected && (
            <Animated.View
              entering={FadeInLeft}
              exiting={FadeOutRight}
              className="gap-y-2"
            >
              <SimpleGrid
                listKey={sortElementsByDate(elements).map(
                  (element) => element.id
                )}
                itemDimension={WINDOW_WIDTH / 3 - PARENT_PADDING * 2}
                data={sortElementsByDate(elements)}
                renderItem={({ item }) => (
                  <ListItem
                    key={item.id}
                    image={item.uri}
                    transitionTag={`element-${item.id}`}
                    onPress={() =>
                      router.push({
                        pathname: "/viewer",
                        params: {
                          transitionTag: `element-${item.id}`,
                          id: item.id,
                          fromHome: "true",
                        },
                      })
                    }
                    onLongPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                      router.push({
                        pathname: "/actions",
                        params: {
                          transitionTag: `element-${item.id}`,
                          id: item.id,
                          fromHome: "true",
                        },
                      })
                    }}
                  />
                )}
              />
            </Animated.View>
          )}
          {folders.length > 0 && collectionsSelected && (
            <Animated.View entering={FadeInLeft} exiting={FadeOutRight}>
              <SimpleGrid
                listKey={folders.map((folder) => folder.id)}
                itemDimension={WINDOW_WIDTH / 2 - PARENT_PADDING * 2 - 7}
                data={folders}
                spacing={7}
                renderItem={({ item }) => <CollectionItem collection={item} />}
              />
            </Animated.View>
          )}
        </ScrollView>
      </ParentView>
    </Animated.View>
  )
}

export default observer(HomeScreen)
