import CollectionItem from "@/components/home/CollectionItem"
import ListItem from "@/components/home/ListItem"
import { ParentView, Text } from "@/components/StyledComponents"
import { Colors } from "@/constants/colors"
import { PARENT_PADDING, WINDOW_WIDTH } from "@/constants/dimensions"
import { state$ } from "@/lib/store/state"
import { share } from "@/lib/utils"
import { observer } from "@legendapp/state/react"
import * as Haptics from "expo-haptics"
import { useRouter } from "expo-router"
import { ChevronRightIcon } from "lucide-react-native"
import { Pressable, ScrollView, View } from "react-native"
import Animated, { FadeIn, FadeOut } from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { SimpleGrid } from "react-native-super-grid"

function HomeScreen() {
  const insets = useSafeAreaInsets()
  const elements = state$.elements.get()
  const folders = state$.getFoldersWithElements()
  const router = useRouter()

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
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: insets.top + 20,
          }}
        >
          {elements.length > 0 && (
            <View className="gap-y-2">
              <View className="flex-row items-center justify-between">
                <Text className="pl-4 text-2xl" family="Gambarino">
                  Recent Elements
                </Text>
                <Pressable className="flex-row items-center gap-x-1 pr-4">
                  <Text color={Colors.mutedText} family="SwitzerMedium">
                    See all
                  </Text>
                  <ChevronRightIcon size={16} color={Colors.mutedText} />
                </Pressable>
              </View>
              <SimpleGrid
                listKey={elements.slice(0, 6).map((element) => element.id)}
                itemDimension={WINDOW_WIDTH / 3 - PARENT_PADDING * 2}
                data={elements.slice(0, 6)}
                renderItem={({ item }) => (
                  <ListItem
                    key={item.id}
                    image={item.uri}
                    transitionTag={`element-${item.id}`}
                    onPress={async () => await share(item.uri)}
                    onLongPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                      router.push({
                        pathname: "/random",
                        params: {
                          transitionTag: `element-${item.id}`,
                          id: item.id,
                        },
                      })
                    }}
                  />
                )}
              />
            </View>
          )}
          {folders.length > 0 && (
            <View className="mt-3">
              <Text className="pl-4 text-center text-2xl" family="Gambarino">
                Folders
              </Text>

              <SimpleGrid
                listKey={folders.map((folder) => folder.id)}
                itemDimension={WINDOW_WIDTH / 2 - PARENT_PADDING * 2 - 20}
                data={folders}
                spacing={20}
                renderItem={({ item }) => <CollectionItem collection={item} />}
              />
            </View>
          )}
        </ScrollView>
      </ParentView>
    </Animated.View>
  )
}

export default observer(HomeScreen)
