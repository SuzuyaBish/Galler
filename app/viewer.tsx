import { ParentView } from "@/components/StyledComponents"
import GestureScrollView from "@/components/viewer/GestureScrollView"
import MasonryElementList from "@/components/viewer/MasonryElementList"
import { PARENT_PADDING } from "@/constants/dimensions"
import { state$ } from "@/lib/store/state"
import type { Element } from "@/lib/types/state-types"
import { WINDOW_HEIGHT } from "@gorhom/bottom-sheet"
import { observer } from "@legendapp/state/react"
import { BlurView } from "expo-blur"
import { Image } from "expo-image"
import { useLocalSearchParams, useRouter } from "expo-router"
import { Share2Icon } from "lucide-react-native"
import React from "react"
import {
  Button,
  Pressable,
  ScrollView,
  View,
  useWindowDimensions,
} from "react-native"
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"

type Params = {
  transitionTag: string
  id: string
}

const AnimatedImage = Animated.createAnimatedComponent(Image)
const DISMISS_THRESHOLD = 100

function Viewer() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const { width: windowWidth } = useWindowDimensions()
  const { transitionTag, id } = useLocalSearchParams() as Params
  const elements = state$.elements.get()
  const scrollViewRef = React.useRef<ScrollView>(null)
  const [isFullScreen, setIsFullScreen] = React.useState(false)

  const offset = useSharedValue(0)
  const maxHeight = WINDOW_HEIGHT * 0.75 - insets.top - insets.bottom
  const fullScreenScale = useSharedValue(1)
  const fullScreenOpacity = useSharedValue(1)
  const isDismissing = useSharedValue(false)

  const handleImagePress = React.useCallback(
    (element: Element) => {
      if (!elements) return
      scrollViewRef.current?.scrollTo({ y: 0, animated: true })
      offset.value = 0
      router.setParams({ id: element.id })
    },
    [elements, router]
  )

  const toggleFullScreen = React.useCallback(() => {
    setIsFullScreen((prev) => !prev)
    fullScreenScale.value = withTiming(isFullScreen ? 1 : 1.1, {
      duration: 300,
    })
    fullScreenOpacity.value = withTiming(isFullScreen ? 1 : 0, {
      duration: 300,
    })
  }, [isFullScreen])

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      "worklet"
      offset.value = event.contentOffset.y
      if (event.contentOffset.y < -DISMISS_THRESHOLD && !isDismissing.value) {
        isDismissing.value = true
        runOnJS(router.back)()
      }
    },
  })

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: 1 - Math.min(1, Math.abs(offset.value) / 400),
    transform: [
      { translateY: Math.min(30, Math.abs(offset.value) / 10) },
      { scale: fullScreenScale.value },
    ],
  }))

  const buttonStyle = useAnimatedStyle(() => ({
    opacity: Math.min(
      1 - Math.abs(offset.value) / 100,
      fullScreenOpacity.value
    ),
  }))

  const uiStyle = useAnimatedStyle(() => ({
    opacity: fullScreenOpacity.value,
  }))

  if (elements) {
    const selectedElement = elements.find((element) => element.id === id)
    if (!selectedElement) return null

    const aspectRatio = selectedElement.width / selectedElement.height
    const displayWidth = windowWidth
    const displayHeight = Math.min(maxHeight, windowWidth / aspectRatio)

    return (
      <ParentView hasInsets={false} extraInsets={false} className="relative">
        <Animated.View style={uiStyle}>
          <BlurView
            className="absolute left-0 right-0 top-0 z-20"
            experimentalBlurMethod="dimezisBlurView"
            intensity={50}
          >
            <View style={{ paddingTop: insets.top }}>
              <Button title="Back" onPress={() => router.back()} />
            </View>
          </BlurView>
        </Animated.View>
        <Animated.View
          className="flex-1 items-center justify-center"
          style={animatedStyle}
        >
          <Pressable onPress={toggleFullScreen}>
            <View
              style={{
                width: displayWidth,
                height: displayHeight,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AnimatedImage
                contentFit="contain"
                style={{
                  width: displayWidth,
                  height: displayHeight,
                  backgroundColor: "transparent",
                }}
                sharedTransitionTag={transitionTag}
                source={selectedElement.uri}
              />
            </View>
          </Pressable>
        </Animated.View>
        <Animated.View
          className="absolute left-0 right-0 flex flex-row items-center justify-center gap-x-3"
          style={[
            buttonStyle,
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
        <GestureScrollView
          ref={scrollViewRef}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          className="absolute bottom-0 left-0 right-0 top-0 flex-1"
          contentContainerStyle={{
            paddingTop: WINDOW_HEIGHT - insets.bottom,
            paddingBottom: insets.bottom + 30,
          }}
        >
          <Animated.View style={uiStyle}>
            <MasonryElementList
              elements={elements}
              scrollEnabled={true}
              onPress={handleImagePress}
              enableNavigation={false}
            />
          </Animated.View>
        </GestureScrollView>
      </ParentView>
    )
  }
}

export default observer(Viewer)
