import { Colors } from "@/constants/colors"
import { PARENT_PADDING } from "@/constants/dimensions"
import { FontType } from "@/lib/types/font-types"
import { assignFontFamily, cn } from "@/lib/utils"
import { LinearGradient } from "expo-linear-gradient"
import { StatusBar } from "expo-status-bar"
import { FC } from "react"
import {
  Text as DefaultText,
  View as DefaultView,
  useColorScheme,
} from "react-native"
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
  const colorscheme = useColorScheme()
  const colors = Colors[colorscheme ?? "light"]
  return (
    <DefaultText
      {...props}
      style={[props.style, { fontFamily, color: color ?? colors.text }]}
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
  const colorscheme = useColorScheme()
  const colors = Colors[colorscheme ?? "light"]
  return (
    <>
      <StatusBar style={colorscheme === "light" ? "dark" : "light"} />
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
          hasInsets && { paddingTop: insets.top + (extraInsets ? 30 : 0) },
          padding?.left && { paddingLeft: PARENT_PADDING },
          padding?.right && { paddingRight: PARENT_PADDING },
          padding?.top && { paddingTop: insets.top + 30 },
          padding?.bottom && { paddingBottom: insets.bottom + 30 },
        ]}
      >
        <LinearGradient
          colors={colors.gradientBg}
          locations={[0, 0.5, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
        {children}
      </DefaultView>
    </>
  )
}

export { ParentView, Text }
