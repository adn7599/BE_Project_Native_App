import React from 'react';
import { View, StyleSheet, SafeAreaView, Text} from 'react-native';
import colours from './colours';
const app = () => {

  return (
    <SafeAreaView>
      <Text style={{color: colours.green}}>Hello world</Text>
    </SafeAreaView>
  )
}

export default app;