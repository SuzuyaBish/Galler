import HomeEmptyView from "@/components/HomeEmptyView"
import { ParentView, Text } from "@/components/StyledComponents"
import { Colors } from "@/constants/colors"
import { PARENT_PADDING, TAB_BAR_HEIGHT } from "@/constants/dimensions"
import BottomSheet, { WINDOW_WIDTH } from "@gorhom/bottom-sheet"
import { Image } from "expo-image"
import { SquircleView } from "expo-squircle-view"
import { useRef, useState } from "react"
import { Pressable, ScrollView, View, useColorScheme } from "react-native"
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function HomeScreen() {
  const bottomSheetRef = useRef<BottomSheet>(null)
  const colorscheme = useColorScheme()
  const colors = Colors[colorscheme ?? "light"]
  const insets = useSafeAreaInsets()
  const [arraySize, setArraySize] = useState(5)

  if (arraySize === 0) {
    return <HomeEmptyView />
  }

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
          <View
            className="flex flex-row items-center gap-x-3"
            style={{ marginTop: 30 }}
          >
            <Text className="text-4xl" family="SatoshiBold">
              Folders
            </Text>
            <View
              className="size-4 rounded-full"
              style={{ backgroundColor: colors.redColor }}
            />
          </View>
          <View
            className="mt-10 flex flex-row flex-wrap justify-between"
            style={{ rowGap: PARENT_PADDING }}
          >
            {Array(arraySize)
              .fill(0)
              .map((_, index) => {
                return (
                  <Pressable
                    key={index}
                    onPress={() => {
                      setArraySize(arraySize - 1)
                    }}
                  >
                    <Animated.View
                      layout={LinearTransition}
                      entering={FadeIn}
                      exiting={FadeOut}
                    >
                      <SquircleView
                        borderRadius={20}
                        style={{
                          height:
                            WINDOW_WIDTH / 2 -
                            PARENT_PADDING -
                            PARENT_PADDING / 2,
                          width:
                            WINDOW_WIDTH / 2 -
                            PARENT_PADDING -
                            PARENT_PADDING / 2,
                          overflow: "hidden",
                          backgroundColor: colors.lightMutedText,
                        }}
                      >
                        <Image
                          source={require("../assets/images/img.jpeg")}
                          contentFit="cover"
                          style={{
                            height:
                              WINDOW_WIDTH / 2 -
                              PARENT_PADDING -
                              PARENT_PADDING / 2,
                            width:
                              WINDOW_WIDTH / 2 -
                              PARENT_PADDING -
                              PARENT_PADDING / 2,
                          }}
                        />
                      </SquircleView>
                    </Animated.View>
                  </Pressable>
                )
              })}
          </View>
        </ScrollView>
      </ParentView>
    </Animated.View>
  )
}
