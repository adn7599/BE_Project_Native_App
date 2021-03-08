import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import Logo from '../Assets/svgComponents/Logo';
import colours from '../colours';


const LoginOrRegister = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      
      <View style={styles.container}>
          
        <Logo style={styles.logo}/>

        <View style={styles.contentContainer}>
          <Text style={styles.text}>
            If you have an{'\n'}
            account,
          </Text>

          <TouchableOpacity style={[styles.button,{backgroundColor: colours.green}]}>
            <Text style={styles.btText}>
              Log In
            </Text>
          </TouchableOpacity>

          <Text style={styles.text}>
            else, create a{'\n'}
            new one,
          </Text>

          <TouchableOpacity style={[styles.button,{backgroundColor: colours.orange}]}>
            <Text style={styles.btText}>
              Register 
            </Text>
          </TouchableOpacity>

        </View>
        
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.light,
    alignItems: 'center',
    padding: 30,
  },
  logo: {
    flex: 1,
    width: 300,
    height: 300,
    margin: 40,
  },
  contentContainer: {
    flex: 2,
    alignSelf: 'flex-start',
    alignItems:'center',
    marginHorizontal: 20, 
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 180,
    height: 60,
    borderRadius: 10,
  },
  btText: {
    fontSize: 20,
    fontFamily: 'Roboto-Regular',
    fontWeight: 'bold',
    color: 'white'
  },
  text: {
    //alignSelf: 'flex-start',
    fontSize: 30,
    color: colours.brown,
    padding: 30,
    fontFamily: 'Roboto-Regular',
    fontWeight: 'bold',
  }
});

export default LoginOrRegister;
