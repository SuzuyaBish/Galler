import React from "react"
import { ScrollView, ScrollViewProps } from "react-native"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import Animated, { runOnJS, useSharedValue } from "react-native-reanimated"

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)

interface GestureScrollViewProps extends ScrollViewProps {
  onHorizontalGesture?: (direction: "left" | "right") => void
  pagerEnabled?: boolean
}

const MIN_SWIPE_DISTANCE = 20 // Minimum distance for a swipe
const MIN_SWIPE_VELOCITY = 300 // Minimum velocity for a quick swipe
const VELOCITY_THRESHOLD = 2 // How much stronger horizontal velocity should be compared to vertical

const GestureScrollView = React.forwardRef<ScrollView, GestureScrollViewProps>(
  ({ children, onHorizontalGesture, pagerEnabled = true, ...props }, ref) => {
    const isScrolling = useSharedValue(false)
    const startX = useSharedValue(0)
    const hasTriggeredGesture = useSharedValue(false)

    const handleGesture = React.useCallback(
      (direction: "left" | "right") => {
        onHorizontalGesture?.(direction)
      },
      [onHorizontalGesture]
    )

    const panGesture = Gesture.Pan()
      .onBegin((event) => {
        "worklet"
        startX.value = event.x
        hasTriggeredGesture.value = false
      })
      .onUpdate((event) => {
        "worklet"
        if (hasTriggeredGesture.value || !pagerEnabled || isScrolling.value)
          return

        const dx = event.x - startX.value
        const absDx = Math.abs(dx)
        const absDy = Math.abs(event.translationY)

        // Check if the gesture is more horizontal than vertical
        const isHorizontal = absDx > absDy

        // Check velocity
        const isQuickSwipe =
          Math.abs(event.velocityX) > MIN_SWIPE_VELOCITY &&
          Math.abs(event.velocityX) >
            Math.abs(event.velocityY) * VELOCITY_THRESHOLD

        // Trigger on either sufficient distance or velocity
        if (isHorizontal && (absDx > MIN_SWIPE_DISTANCE || isQuickSwipe)) {
          hasTriggeredGesture.value = true
          if (dx > 0) {
            runOnJS(handleGesture)("right")
          } else {
            runOnJS(handleGesture)("left")
          }
        }
      })
      .onFinalize(() => {
        "worklet"
        startX.value = 0
        hasTriggeredGesture.value = false
      })

    return (
      <GestureDetector gesture={panGesture}>
        <AnimatedScrollView
          ref={ref}
          onScrollBeginDrag={() => {
            isScrolling.value = true
          }}
          onScrollEndDrag={() => {
            isScrolling.value = false
          }}
          onMomentumScrollBegin={() => {
            isScrolling.value = true
          }}
          onMomentumScrollEnd={() => {
            isScrolling.value = false
          }}
          {...props}
        >
          {children}
        </AnimatedScrollView>
      </GestureDetector>
    )
  }
)

GestureScrollView.displayName = "GestureScrollView"

export default GestureScrollView
