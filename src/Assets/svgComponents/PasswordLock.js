import * as React from "react"
import Svg, { Path } from "react-native-svg"

function PasswordLock(props) {
  return (
    <Svg
      width={87}
      height={79}
      viewBox="0 0 87 79"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M65.25 26.333h7.25c.961 0 1.883.347 2.563.965.68.617 1.062 1.454 1.062 2.327v39.5c0 .873-.382 1.71-1.062 2.328-.68.617-1.602.964-2.563.964h-58c-.961 0-1.883-.347-2.563-.964-.68-.618-1.062-1.455-1.062-2.328v-39.5c0-.873.382-1.71 1.062-2.328.68-.617 1.602-.964 2.563-.964h7.25v-3.291c0-5.238 2.291-10.262 6.37-13.966 4.08-3.704 9.611-5.784 15.38-5.784s11.3 2.08 15.38 5.784c4.078 3.704 6.37 8.728 6.37 13.966v3.291zm-47.125 6.584v32.916h50.75V32.917h-50.75zm21.75 13.166h7.25v6.584h-7.25v-6.584zm-14.5 0h7.25v6.584h-7.25v-6.584zm29 0h7.25v6.584h-7.25v-6.584zM58 26.333v-3.291c0-3.492-1.528-6.841-4.247-9.31-2.72-2.47-6.407-3.857-10.253-3.857s-7.534 1.387-10.253 3.856C30.527 16.201 29 19.55 29 23.041v3.292h29z"
        fill="#472225"
      />
    </Svg>
  )
}

export default PasswordLock; 
