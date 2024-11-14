import { observable } from "@legendapp/state"
import * as MediaLibrary from "expo-media-library"

export const createState$ = observable({
  selectedAction: undefined as "folder" | "media" | "step1" | undefined,
  selectedAlbum: undefined as MediaLibrary.Album | undefined,
  selectedAssets: [],
  setDefault: () => {
    createState$.selectedAction.set("step1")
    createState$.selectedAlbum.set(undefined)
    createState$.selectedAssets.set([])
  },
})
