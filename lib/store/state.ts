import { observable } from "@legendapp/state"
import { observablePersistAsyncStorage } from "@legendapp/state/persist-plugins/async-storage"
import { configureSynced, syncObservable } from "@legendapp/state/sync"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Directory, File, Paths } from "expo-file-system/next"
import { ImagePickerAsset } from "expo-image-picker"
import uuid from "react-native-uuid"
import { Element, Folder } from "../types/state-types"

export const generateId = () => uuid.v4() as string

const persistOptions = configureSynced({
  persist: {
    plugin: observablePersistAsyncStorage({
      AsyncStorage,
    }),
  },
})

export const state$ = observable({
  elements: [] as Element[],
  folders: [] as Folder[],
  createElement: async (elements: ImagePickerAsset[]) => {
    try {
      const newDirectory = new Directory(Paths.document, "store")
      if (!newDirectory.exists) newDirectory.create()

      for (const element of elements) {
        const file = new File(element.uri)
        await file.move(newDirectory)

        state$.elements.push({
          ...element,
          id: generateId(),
          uri: file.uri,
          folderId: "",
        })
      }
    } catch (error) {
      console.log(error)
    }
  },
  getFoldersWithElements: () => {
    return state$.folders.get().map((folder) => {
      return {
        ...folder,
        elements: state$.elements
          .get()
          .filter((element) => element.folderId === folder.id),
      }
    })
  },
  createFolder: (name: string) => {
    state$.folders.push({
      id: generateId(),
      name,
    })
  },
})

syncObservable(
  state$,
  persistOptions({
    persist: {
      name: "state",
    },
  })
)
