import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

import {windowHeight, windowWidth} from '../utils/DImensions';

const BlockButton = (buttonTitle, buttonColor, ...rest) => {
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, {backgroundColor: {buttonColor}}]}
      {...rest}>
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    height: windowHeight / 15,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default BlockButton;
