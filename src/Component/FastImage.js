import React from 'react';
import {View, Dimensions, Image} from 'react-native';
import FastImage from 'react-native-fast-image';

import {IMAGE_URL} from '../serverQueries/config';
const dimension = Dimensions.get('screen');

export default function MyFastImage({imageId, imageLoaded, setImageLoaded}) {
  const fastImageDisplay = imageLoaded ? 'flex' : 'none';

  return (
    <>
      <View
        style={{
          width: imageLoaded ? dimension.width - 75 : 0,
          height: imageLoaded ? 200 : 0,
        }}>
        <FastImage
          style={{
            width: dimension.width - 75,
            height: 200,
            alignContent: 'stretch',
            backgroundColor: '#c0c0c0',
            borderRadius : 10
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
