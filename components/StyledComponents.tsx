import { Colors } from "@/constants/colors"
import { PARENT_PADDING } from "@/constants/dimensions"
import { FontType } from "@/lib/types/font-types"
import { assignFontFamily, cn } from "@/lib/utils"
import { StatusBar } from "expo-status-bar"
import { FC } from "react"
import { Text as DefaultText, View as DefaultView } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

interface StyledText extends React.ComponentProps<typeof DefaultText> {
  family?: FontType
  color?: string
}

interface ParentView extends React.ComponentProps<typeof DefaultView> {
  padding?: {
    top?: boolean
    bottom?: boolean
    left?: boolean
    right?: boolean
  }
  extraInsets?: boolean
  hasInsets?: boolean
  children?: React.ReactNode
}

const Text: FC<StyledText> = ({
  family = "SatoshiMedium",
  color,
  ...props
}) => {
  const fontFamily = assignFontFamily(family)
  return (
    <DefaultText
      {...props}
      style={[props.style, { fontFamily, color: color ?? Colors.text }]}
    />
  )
}

const ParentView: FC<ParentView> = ({
  children,
  hasInsets,
  padding,
  extraInsets = true,
  ...props
}) => {
  const insets = useSafeAreaInsets()
  return (
    <>
      <StatusBar style="light" />
      <DefaultView
        {...props}
        className={cn(
          "relative flex flex-1",
          padding?.top && "pt-8",
          padding?.bottom && "pb-8",
          padding?.left && "pl-8",
          padding?.right && "pr-8",
          props.className
        )}
        style={[
          props.style,
          { backgroundColor: Colors.background },
          hasInsets && { paddingTop: insets.top + (extraInsets ? 30 : 0) },
          padding?.left && { paddingLeft: PARENT_PADDING },
          padding?.right && { paddingRight: PARENT_PADDING },
          padding?.top && { paddingTop: insets.top + 30 },
          padding?.bottom && { paddingBottom: insets.bottom + 30 },
        ]}
      >
        {children}
      </DefaultView>
    </>
  )
}

export { ParentView, Text }
