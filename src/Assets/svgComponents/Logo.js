import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Logo(props) {
  return (
    <Svg
      width={132}
      height={152}
      viewBox="0 0 132 152"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M65.984 14.745l25.2 14.552 12.777-7.356L65.984 0 2.549 36.654l12.713 7.357 50.722-29.266z"
        fill="#FFC33A"
      />
      <Path
        d="M116.674 29.297l-50.69 29.266-25.2-14.552-12.745 7.356 37.945 21.909 63.467-36.622-12.777-7.357z"
        fill="#EA7432"
      />
      <Path
        d="M12.745 78.535L0 71.18v43.817l63.435 36.654v-14.713l-50.69-29.298V78.536z"
        fill="#510B16"
      />
      <Path
        d="M0 56.465L50.69 85.73v29.104l12.745 7.389v-43.85L0 41.753v14.713zM106.51 71.178V56.465L68.533 78.374v73.276l12.745-7.357V85.73l25.232-14.552z"
        fill="#9E9F42"
      />
      <Path
        d="M119.223 49.108v58.531l-25.2 14.584v14.713L132 114.995V41.752l-12.777 7.356z"
        fill="#510B16"
      />
    </Svg>
  );
}

export default Logo;
