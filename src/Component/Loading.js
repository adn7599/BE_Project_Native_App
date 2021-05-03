import React from 'react';
import {View,} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

export default function Loading() {
  return (
    <View>
      <ActivityIndicator size={'large'} animating = {true}/>
    </View>
  );
}
