import React, {useContext,useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  BackHandler
} from 'react-native';

import colours from '../colours';
import Context from '../Global/context';

const windowHeight = Dimensions.get('screen').height;
const windowWidth = Dimensions.get('screen').width;
//import {windowHeight, windowWidth} from '../utils/Dimensions';

const LoginForm = ({route, navigation}) => {
  //   userType = 'Shopkeeper';
  const {setUser} = useContext(Context);
  const {UserType} = route.params;

  /*useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);*/


  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.headingText}>
            Welcome {UserType}! Login to start exploring.
          </Text>
          <Image source={require('../Assets/Logo.png')} />
        </View>
        <View style={styles.inputFields}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            maxLength={10}
            placeholder="Identification number"
            placeholderTextColor={colours.brown}
          />
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            keyboardType="visible-password"
            placeholder="Password"
            placeholderTextColor={colours.brown}
          />
        </View>
        <TouchableOpacity style={styles.button} 
        onPress = {() => setUser(UserType)}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    justifyContent: 'space-evenly',
    backgroundColor: colours.light,
    paddingHorizontal: 25,
  },
  heading: {
    flexDirection: 'row',
    width: windowWidth / 2,
  },
  headingText: {
    color: colours.brown,
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 30,
  },
  inputFields: {
    marginBottom: 10,
  },
  input: {
    borderRadius: 3,
    borderWidth: 1,
    borderColor: colours.brown,
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  button: {
    minWidth: windowWidth / 1.5,
    minHeight: windowHeight / 15,
    backgroundColor: colours.green,
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

export default LoginForm;