import * as React from "react"
import { View } from "react-native"
import Svg, {
  ClipPath,
  Defs,
  G,
  Image,
  Polygon,
  SvgProps,
} from "react-native-svg"

interface Props extends SvgProps {
  imageUri: string
  offsetTop?: number
  offsetRight?: number
}

interface ParentProps extends Omit<SvgProps, "children"> {
  children: React.ReactNode
}

const SVG_CONFIG = {
  width: 200,
  height: 200,
  viewBox: "0 0 200 200",
  points: "100,0 200,0 200,100",
}

const Triangle = ({ imageUri, offsetTop = 0, offsetRight = 0, ...props }: Props) => (
  <View style={{ 
    position: 'absolute', 
    top: offsetTop, 
    right: offsetRight,
    width: '100%',
    height: '100%'
  }}>
    <Svg
      width="100%"
      height="100%"
      viewBox={SVG_CONFIG.viewBox}
      {...props}
    >
      <Defs>
        <ClipPath id="triangleClip">
          <Polygon points={SVG_CONFIG.points} />
        </ClipPath>
      </Defs>

      <G clipPath="url(#triangleClip)">
        <Image
          x="0"
          y="0"
          width="200"
          height="200"
          preserveAspectRatio="xMidYMid slice"
          href={imageUri}
        />
      </G>
    </Svg>
  </View>
)

const TriangleParent = ({ children, ...props }: ParentProps) => (
  <View
    style={{
      position: "relative",
      width: SVG_CONFIG.width,
      height: SVG_CONFIG.height,
    }}
  >
    {children}
  </View>
)

export { Triangle, TriangleParent }
