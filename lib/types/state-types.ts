import { ImagePickerAsset } from "expo-image-picker"

export type Element = {
  id: string
  folderId: string
} & ImagePickerAsset

export type Folder = {
  id: string
  name: string
}

export type Collection = {
  id: string
  name: string
  elements: Element[]
}
