import { observable } from "@legendapp/state"
import { observablePersistAsyncStorage } from "@legendapp/state/persist-plugins/async-storage"
import { configureSynced, syncObservable } from "@legendapp/state/sync"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as FileSystem from "expo-file-system"
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
      const directory = `${FileSystem.documentDirectory}store`
      await FileSystem.makeDirectoryAsync(directory, { intermediates: true })

      for (const element of elements) {
        const newUri = `${directory}/${generateId()}-${element.fileName}`
        await FileSystem.copyAsync({
          from: element.uri,
          to: newUri,
        })

        state$.elements.push({
          ...element,
          id: generateId(),
          uri: newUri,
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
