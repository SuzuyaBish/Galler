import { ParentView } from "@/components/StyledComponents"
import MasonryElementList from "@/components/viewer/MasonryElementList"
import { PARENT_PADDING } from "@/constants/dimensions"
import { state$ } from "@/lib/store/state"
import { WINDOW_HEIGHT } from "@gorhom/bottom-sheet"
import { observer } from "@legendapp/state/react"
import { Image } from "expo-image"
import { useLocalSearchParams, useRouter } from "expo-router"
import { Share2Icon } from "lucide-react-native"
import React from "react"
import { Button, Pressable, ScrollView, View } from "react-native"
import PagerView from "react-native-pager-view"
import Animated from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"

type Params = {
  transitionTag: string
  id: string
}

const AnimatedImage = Animated.createAnimatedComponent(Image)

function Viewer() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const { transitionTag, id } = useLocalSearchParams() as Params
  const elements = state$.elements.get()

  if (elements) {
    return (
      <ParentView hasInsets={false} extraInsets={false} className="relative">
        <View className="absolute left-0 right-0" style={{ top: insets.top }}>
          <Button title="Back" onPress={() => router.back()} />
        </View>
        <View className="flex-1 items-center justify-center">
          <PagerView
            style={{
              flex: 1,
              height: "100%",
              width: "100%",
              maxHeight: WINDOW_HEIGHT * 0.75 - insets.top - insets.bottom,
            }}
            initialPage={elements.findIndex((element) => element.id === id)}
          >
            {elements.map((element) => {
              return (
                <AnimatedImage
                  key={element.id}
                  contentFit="contain"
                  style={[
                    {
                      width: "100%",
                      height: "auto",
                      aspectRatio:
                        (element?.width ?? 1) / (element?.height ?? 1),
                    },
                  ]}
                  sharedTransitionTag={transitionTag}
                  source={element.uri}
                />
              )
            })}
          </PagerView>
        </View>
        <View
          className="absolute left-0 right-0 flex flex-row items-center justify-center gap-x-3"
          style={{
            bottom: insets.bottom + 30,
            paddingHorizontal: PARENT_PADDING,
          }}
        >
          <Pressable>
            <Share2Icon />
          </Pressable>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="absolute bottom-0 left-0 right-0 top-0 flex-1"
          contentContainerStyle={{
            paddingBottom: insets.bottom + 30,
          }}
          style={{
            paddingTop: WINDOW_HEIGHT - insets.bottom,
          }}
        >
          <MasonryElementList elements={elements} scrollEnabled={false} />
        </ScrollView>
      </ParentView>
    )
  }
}

export default observer(Viewer)
