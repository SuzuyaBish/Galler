import { Colors } from "@/constants/colors"
import { cn } from "@/lib/utils"
import { ChevronRightIcon } from "lucide-react-native"
import { FC } from "react"
import { Pressable, View } from "react-native"
import { Text } from "../StyledComponents"

interface CreateOptionProps extends React.ComponentProps<typeof Pressable> {
  icon: React.ReactNode
  title: string
  subtitle: string
}

const CreateOption: FC<CreateOptionProps> = ({
  icon,
  title,
  subtitle,
  ...props
}) => {
  return (
    <Pressable
      {...props}
      style={{ backgroundColor: Colors.lightMutedBackground }}
      className={cn(
        "flex-row items-center justify-between rounded-3xl p-5",
        props.className
      )}
    >
      <View className="flex-row items-center gap-x-3">
        <View
          style={{ backgroundColor: Colors.mutedBackground }}
          className="rounded-xl p-3"
        >
          {icon}
        </View>
        <View>
          <Text
            className="text-base"
            color={Colors.text}
            family="SwitzerMedium"
          >
            {title}
          </Text>
          <Text className="text-sm" color={Colors.mutedText}>
            {subtitle}
          </Text>
        </View>
      </View>
      <ChevronRightIcon height={18} width={18} color={Colors.icon} />
    </Pressable>
  )
}

export default CreateOption
