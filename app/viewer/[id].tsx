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
import { Button, Pressable, View } from "react-native"
import PagerView from "react-native-pager-view"
import Animated, {
  useAnimatedProps,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated"
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

  const offset = useSharedValue(0)
  const scrollHandler = useAnimatedScrollHandler((event) => {
    offset.value = event.contentOffset.y
  })

  const offsetAnimation = useAnimatedProps(() => {
    return {
      opacity: 1 - Math.min(1, offset.value / 300),
      transform: [{ translateY: -Math.min(30, offset.value / 10) }],
    }
  })

  const offsetAnimationFaster = useAnimatedProps(() => {
    return {
      opacity: 1 - Math.min(1, offset.value / 100),
    }
  })

  if (elements) {
    return (
      <ParentView hasInsets={false} extraInsets={false} className="relative">
        <View className="absolute left-0 right-0" style={{ top: insets.top }}>
          <Button title="Back" onPress={() => router.back()} />
          {/* <Text>
            {(WINDOW_HEIGHT -
              (WINDOW_HEIGHT * 0.75 - insets.top - insets.bottom)) /
              2}
          </Text> */}
        </View>
        <Animated.View
          className="flex-1 items-center justify-center"
          style={offsetAnimation}
        >
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
        </Animated.View>
        <Animated.View
          className="absolute left-0 right-0 flex flex-row items-center justify-center gap-x-3"
          style={[
            offsetAnimationFaster,
            {
              bottom: insets.bottom + 30,
              paddingHorizontal: PARENT_PADDING,
            },
          ]}
        >
          <Pressable>
            <Share2Icon />
          </Pressable>
        </Animated.View>
        <Animated.ScrollView
          onScroll={scrollHandler}
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
        </Animated.ScrollView>
      </ParentView>
    )
  }
}

export default observer(Viewer)
