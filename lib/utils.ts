import clsx, { ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { FontType } from "./types/font-types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function assignFontFamily(family: FontType) {
  let fontFamily: FontType = "SatoshiRegular"

  switch (family) {
    case "SatoshiLight":
      fontFamily = "SatoshiLight"
      break
    case "SatoshiRegular":
      fontFamily = "SatoshiRegular"
      break
    case "SatoshiMedium":
      fontFamily = "SatoshiMedium"
      break
    case "SatoshiBold":
      fontFamily = "SatoshiBold"
      break
    case "SatoshiBlack":
      fontFamily = "SatoshiBlack"
      break
  }

  return fontFamily
}
