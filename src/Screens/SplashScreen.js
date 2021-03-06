import React, {Component} from 'react';
import {Image, Text, StyleSheet, SafeAreaView} from 'react-native';
import colours from '../colours';

const logo = require('../Assets/Logo.png');

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    setTimeout(() => {
      this.props.navigation.navigate('TestScreen');
    }, 2000);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>Commodity Distribution System</Text>
      </SafeAreaView>
    );
  }
}

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
