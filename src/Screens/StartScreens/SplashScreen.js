import React, {useState, useEffect} from 'react';
import {
  Image,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import colours from '../../colours';
import App from '../../App';

import Logo from '../../Assets/svgComponents/Logo';

const SplashScreen = ({timePassed}) => {
  if (timePassed) {
    return (
      <SafeAreaView style={styles.container}>
        <Logo style={styles.logo} />
        <Text style={styles.title}>Commodity Distribution System</Text>
        <ActivityIndicator size={'large'} color={'#2F070D'} />
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <Logo style={styles.logo} />
        <Text style={styles.title}>Commodity Distribution System</Text>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colours.light,
  },
  logo: {
    width: 132,
    height: 152,
    paddingBottom: 20,
  },
  title: {
    color: colours.brown,
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SplashScreen;
