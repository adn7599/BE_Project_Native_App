import React,{useState} from 'react';
import {View, Dimensions, Image} from 'react-native';
import FastImage from 'react-native-fast-image';

import {IMAGE_URL} from '../serverQueries/config';
const dimension = Dimensions.get('screen');

export default function MyFastImage({imageId,width,height,borderRadius}) {
  const fastImageDisplay = imageLoaded ? 'flex' : 'none';
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      <View
        style={{
          width: imageLoaded ? width : 0,
          height: imageLoaded ? height : 0,
        }}>
        <FastImage
          style={{
            width: width,
            height: height,
            alignContent: 'stretch',
            backgroundColor: '#c0c0c0',
            borderRadius : borderRadius
          }}
          source={{
            uri: `${IMAGE_URL}/${imageId}`,
            //uri: '../../Assets/wheat.png',
            headers: {Authorization: 'someAuthToken'},
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.stretch}
          onLoad={(e) => setImageLoaded(true)}
        />
      </View>
      <Image
        style={{
          width: Dimensions.get('screen').width - 80,
          height: 200,
          display: imageLoaded ? 'none' : 'flex',
        }}
        source={require('../Assets/Images/placeholder.jpg')}
      />
    </>
  );
}
