import { Text } from "@/components/StyledComponents"
import { Colors } from "@/constants/colors"
import { PARENT_PADDING } from "@/constants/dimensions"
import { state$ } from "@/lib/store/state"
import { share } from "@/lib/utils"
import { observer } from "@legendapp/state/react"
import { BlurView } from "expo-blur"
import { Image } from "expo-image"
import { useLocalSearchParams, useRouter } from "expo-router"
import {
  CheckIcon,
  ChevronLeftIcon,
  FolderOpenIcon,
  ShareIcon,
  Trash2Icon,
} from "lucide-react-native"
import React, { useState } from "react"
import { Pressable, ScrollView, View } from "react-native"
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"

type Params = {
  transitionTag: string
  id: string
}

const AnimatedExpoImage = Animated.createAnimatedComponent(Image)
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)

function RandomScreen() {
  const { transitionTag, id } = useLocalSearchParams() as Params

  const folders = state$.getFoldersWithElements()
  const elementState = state$.getElementById(id)
  const element = elementState?.get()

  const insets = useSafeAreaInsets()
  const router = useRouter()

  const [movingFolder, setMovingFolder] = useState<boolean>(false)

  return (
    <Pressable className="flex-1" onPress={() => router.back()}>
      <AnimatedBlurView
        className="relative flex-1"
        tint="dark"
        intensity={80}
        style={{
          paddingTop: insets.top + 30,
          flex: 1,
        }}
      >
        <View className="flex w-full items-center justify-center px-20">
          <AnimatedExpoImage
            sharedTransitionTag={transitionTag}
            source={element?.uri}
            style={{
              maxHeight: 400,
              width: "100%",
              aspectRatio: element!.width / element!.height,
              borderRadius: 20,
            }}
          />
        </View>
        <Animated.View
          style={{
            paddingHorizontal: PARENT_PADDING + 25,
            marginBottom: insets.bottom,
          }}
          className="mt-20 grow gap-y-4"
        >
          {!movingFolder && (
            <Animated.View
              layout={LinearTransition}
              entering={FadeIn}
              exiting={FadeOut}
            >
              <Pressable
                className="flex-row items-center gap-x-7 py-5"
                onPress={async () => await share(element!.uri)}
              >
                <ShareIcon color={Colors.icon} />
                <Text color={Colors.icon} className="text-xl">
                  Share
                </Text>
              </Pressable>
            </Animated.View>
          )}
          <Animated.View
            layout={LinearTransition}
            entering={FadeIn}
            exiting={FadeOut}
          >
            <Pressable
              onPress={() => setMovingFolder(!movingFolder)}
              className="flex-row items-center gap-x-7 py-5"
            >
              {movingFolder ? (
                <ChevronLeftIcon color={Colors.icon} />
              ) : (
                <FolderOpenIcon color={Colors.icon} />
              )}
              <Text color={Colors.icon} className="text-xl">
                Move to folder
              </Text>
            </Pressable>
          </Animated.View>
          {!movingFolder && (
            <Animated.View
              layout={LinearTransition}
              entering={FadeIn}
              exiting={FadeOut}
            >
              <Pressable className="flex-row items-center gap-x-7 py-5">
                <Trash2Icon color={Colors.redColor} />
                <Text color={Colors.redColor} className="text-xl">
                  Delete
                </Text>
              </Pressable>
            </Animated.View>
          )}
          {movingFolder && (
            <View className="flex-1 grow">
              <ScrollView showsVerticalScrollIndicator={false}>
                {folders.map((folder) => {
                  return (
                    <Animated.View
                      layout={LinearTransition}
                      entering={FadeIn}
                      exiting={FadeOut}
                      key={folder.id}
                    >
                      <Pressable
                        className="flex-row items-center justify-between py-5"
                        onPress={() => {
                          const elementInFolder =
                            element?.folderId === folder.id
                          if (elementInFolder) {
                            elementState?.set({
                              ...element,
                              folderId: "",
                            })
                          } else {
                            elementState?.set({
                              ...element!,
                              folderId: folder.id,
                            })
                          }
                        }}
                      >
                        <View className="flex-row items-center gap-x-5">
                          {folder.elements.length > 0 ? (
                            <Image
                              source={folder.elements[0].uri}
                              style={{
                                width: 50,
                                height: 50,
                                borderRadius: 10,
                              }}
                            />
                          ) : (
                            <View
                              style={{
                                width: 50,
                                height: 50,
                                borderRadius: 10,
                                backgroundColor: Colors.lightMutedBackground,
                              }}
                            />
                          )}
                          <View>
                            <Text color={Colors.icon} className="text-xl">
                              {folder.name}
                            </Text>
                            <Text color={Colors.mutedText} className="text-sm">
                              {folder.elements.length}{" "}
                              {folder.elements.length > 1
                                ? "elements"
                                : "element"}
                            </Text>
                          </View>
                        </View>
                        {folder.id === element?.folderId && (
                          <CheckIcon color={Colors.icon} />
                        )}
                      </Pressable>
                    </Animated.View>
                  )
                })}
              </ScrollView>
            </View>
          )}
        </Animated.View>
      </AnimatedBlurView>
    </Pressable>
  )
}

export default observer(RandomScreen)
