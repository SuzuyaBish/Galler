import { Text } from "@/components/StyledComponents"
import { Colors } from "@/constants/colors"
import { PARENT_PADDING } from "@/constants/dimensions"
import { state$ } from "@/lib/store/state"
import { deleteElementFromFileSystem, share } from "@/lib/utils"
import { observer } from "@legendapp/state/react"
import { BlurView } from "expo-blur"
import { Image } from "expo-image"
import { useLocalSearchParams, useRouter } from "expo-router"
import {
  BoxSelectIcon,
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
  fromHome: string
}

const AnimatedExpoImage = Animated.createAnimatedComponent(Image)
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)

function RandomScreen() {
  const { transitionTag, id, fromHome } = useLocalSearchParams() as Params

  const folders = state$.getFoldersWithElements()
  const elementState = state$.getElementById(id)
  const element = elementState?.get()

  const insets = useSafeAreaInsets()
  const router = useRouter()

  const [movingFolder, setMovingFolder] = useState<boolean>(false)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)

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
              maxHeight: 350,
              width: "100%",
              aspectRatio: (element?.width ?? 1) / (element?.height ?? 1),
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
          {!movingFolder && !isDeleting && fromHome !== "true" && (
            <Animated.View
              layout={LinearTransition}
              entering={FadeIn}
              exiting={FadeOut}
            >
              <Pressable className="flex-row items-center gap-x-7 py-5">
                <BoxSelectIcon color={Colors.icon} />
                <Text color={Colors.icon} className="text-xl">
                  Select
                </Text>
              </Pressable>
            </Animated.View>
          )}
          {!isDeleting && (
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
                  Move
                </Text>
              </Pressable>
            </Animated.View>
          )}
          {!movingFolder && !isDeleting && (
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
          {!movingFolder && !isDeleting && (
            <Animated.View
              layout={LinearTransition}
              entering={FadeIn}
              exiting={FadeOut}
            >
              <Pressable
                className="flex-row items-center gap-x-7 py-5"
                onPress={async () => {
                  setIsDeleting(!isDeleting)
                }}
              >
                <Trash2Icon color={Colors.redColor} />
                <Text color={Colors.redColor} className="text-xl">
                  Delete
                </Text>
              </Pressable>
            </Animated.View>
          )}
          {isDeleting && (
            <Animated.View
              layout={LinearTransition}
              entering={FadeIn}
              exiting={FadeOut}
              className="flex-1 grow"
            >
              <Text className="text-center">
                Are you sure you want to delete
              </Text>
              <Text className="text-center">this element?</Text>
              <View className="flex-1 items-center justify-center">
                <View className="flex flex-row items-center justify-center gap-x-5">
                  <Pressable
                    className="px-10 py-5"
                    onPress={() => setIsDeleting(false)}
                  >
                    <Text className="text-xl" color={Colors.icon}>
                      Cancel
                    </Text>
                  </Pressable>
                  <Pressable
                    className="px-10 py-5"
                    onPress={async () => {
                      await deleteElementFromFileSystem(element!.uri).then(
                        () => {
                          elementState?.delete()
                          router.back()
                        }
                      )
                    }}
                  >
                    <Text className="text-xl" color={Colors.redColor}>
                      Delete
                    </Text>
                  </Pressable>
                </View>
              </View>
            </Animated.View>
          )}
          {movingFolder && !isDeleting && (
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
