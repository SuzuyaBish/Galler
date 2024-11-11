import { PARENT_PADDING } from "@/constants/dimensions"
import { FontType } from "@/lib/types/font-types"
import { assignFontFamily, cn } from "@/lib/utils"
import { StatusBar } from "expo-status-bar"
import { FC } from "react"
import { Text as DefaultText, View as DefaultView } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

interface StyledText extends React.ComponentProps<typeof DefaultText> {
  family?: FontType
}

interface ParentView extends React.ComponentProps<typeof DefaultView> {
  hasPadding?: boolean
  hasInsets?: boolean
}

const Text: FC<StyledText> = ({ family = "SatoshiRegular", ...props }) => {
  const fontFamily = assignFontFamily(family)
  return (
    <DefaultText
      {...props}
      className={cn("text-dark", props.className)}
      style={[props.style, { fontFamily }]}
    />
  )
}

const ParentView: FC<ParentView> = ({ hasInsets, hasPadding, ...props }) => {
  const insets = useSafeAreaInsets()
  return (
    <>
      <StatusBar style="dark" />

      <DefaultView
        {...props}
        className={cn(
          "bg-bgColor flex flex-1",
          hasPadding && "pt-8",
          props.className
        )}
        style={[
          props.style,
          hasInsets && { paddingTop: insets.top + 10 },
          hasPadding && { paddingHorizontal: PARENT_PADDING },
        ]}
      />
    </>
  )
}

export { ParentView, Text }
