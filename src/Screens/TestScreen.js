import React, {Component} from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';
import colours from '../colours';

export default class TestScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Test Screeen</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.yellow,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: colours.brown,
  },
});
