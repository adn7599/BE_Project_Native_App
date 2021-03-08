import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Mobile(props) {
  return (
    <Svg
      width={172}
      height={168}
      viewBox="0 0 172 168"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M119.444 18.667H52.556a9.672 9.672 0 00-6.757 2.733A9.224 9.224 0 0043 28v112a9.227 9.227 0 002.799 6.6 9.673 9.673 0 006.757 2.733h66.888a9.672 9.672 0 006.757-2.733A9.227 9.227 0 00129 140V28a9.225 9.225 0 00-2.799-6.6 9.671 9.671 0 00-6.757-2.733zM90.778 140h-9.556v-9.333h9.556V140zm-38.222-18.667V28h66.888v93.333H52.556z"
        fill="#472225"
      />
    </Svg>
  )
}

export default Mobile
