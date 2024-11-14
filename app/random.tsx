import React from "react"
import Animated from "react-native-reanimated"

export default function RandomScreen() {
  return (
    <Animated.View sharedTransitionTag="view">
      <Animated.Text sharedTransitionTag="text" className="text-white">
        Random
      </Animated.Text>
      <Animated.Image
        sharedTransitionTag="sharedImage"
        source={require("../assets/images/img.jpeg")}
        className="h-40 w-full rounded-lg"
      />
    </Animated.View>
  )
}
