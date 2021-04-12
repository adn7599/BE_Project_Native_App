 
import * as React from "react"
import Svg, { Path } from "react-native-svg"

function OtpMessage(props) {
  return (
    <Svg
      width={84}
      height={83}
      viewBox="0 0 84 83"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M70 6.917H14c-3.86 0-7 3.102-7 6.916v41.5c0 3.815 3.14 6.917 7 6.917h10.5v13.028L46.47 62.25H70c3.86 0 7-3.102 7-6.917v-41.5c0-3.814-3.14-6.916-7-6.916zm0 48.416H44.53L31.5 63.056v-7.723H14v-41.5h56v41.5z"
        fill="#472225"
      />
      <Path
        d="M24.5 24.208h35v6.917h-35v-6.917zm0 13.834H49v6.916H24.5v-6.916z"
        fill="#472225"
      />
    </Svg>
  )
}

export default OtpMessage;
