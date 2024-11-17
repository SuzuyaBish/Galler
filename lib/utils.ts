import clsx, { ClassValue } from "clsx"
import { Directory } from "expo-file-system/next"
import * as Sharing from "expo-sharing"
import { twMerge } from "tailwind-merge"
import { FontType } from "./types/font-types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function assignFontFamily(family: FontType) {
  let fontFamily: FontType = "SwitzerRegular"

  switch (family) {
    case "SwitzerLight":
      fontFamily = "SwitzerLight"
      break
    case "SwitzerRegular":
      fontFamily = "SwitzerRegular"
      break
    case "SwitzerMedium":
      fontFamily = "SwitzerMedium"
      break
    case "SwitzerBold":
      fontFamily = "SwitzerBold"
      break
    case "SwitzerBlack":
      fontFamily = "SwitzerBlack"
      break
    case "Gambarino":
      fontFamily = "Gambarino"
      break
  }

  return fontFamily
}

export function printDirectory(directory: Directory, indent: number = 0) {
  console.log(`${" ".repeat(indent)} + ${directory.name}`)
  const contents = directory.list()
  for (const item of contents) {
    if (item instanceof Directory) {
      printDirectory(item, indent + 2)
    } else {
      console.log(
        `${" ".repeat(indent + 2)} - ${item.name} (${item.size} bytes)`
      )
    }
  }
}

export const share = async (uri: string) => {
  const isAvailable = await Sharing.isAvailableAsync()
  if (isAvailable) {
    await Sharing.shareAsync(uri, {
      dialogTitle: "Share image",
    })
  }
}
