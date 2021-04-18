import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  BackHandler,
  ToastAndroid,
} from 'react-native';

import colours from '../../../colours';
import Logo from '../../../Assets/svgComponents/Logo';
import {useState} from 'react/cjs/react.development';
import Login from '../../../serverQueries/User/login';
import useUserCred from '../../../UserCredentials';

const windowHeight = Dimensions.get('screen').height;
const windowWidth = Dimensions.get('screen').width;

const LoginForm = ({route, navigation}) => {
  const {role, roleTitle} = route.params;
  const [password, setPassword] = useState('');
  const [regId, setRegId] = useState('');

  const {saveUserCred} = useUserCred();

  const onLogin = async () => {
    if (regId && password) {
      const [respErr, ttpToken,relayToken] = await Login(
        role,
        regId,
        password,
      );
      console.log('log resp', respErr, ttpToken,relayToken);
      if (respErr == null) {
        saveUserCred(role,regId,ttpToken,relayToken)
      } else {
        ToastAndroid.show(
          respErr,
          ToastAndroid.SHORT,
        );
      }
    } else {
      ToastAndroid.show(
        `${numberType} or password is empty`,
        ToastAndroid.SHORT,
      );
    }
  };

  const numberType =
    role === 'customer' ? 'Ration Card number' : 'Registration No.';

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.headingText}>
            Welcome {roleTitle}! Login to start exploring.
          </Text>
          <Logo />
        </View>
        <View style={styles.inputFields}>
          <TextInput
            value={regId}
            style={styles.input}
            maxLength={10}
            placeholder={numberType}
            placeholderTextColor={colours.brown}
            onChangeText={(text) => setRegId(text)}
          />
          <TextInput
            value={password}
            style={styles.input}
            secureTextEntry={true}
            keyboardType="visible-password"
            placeholder="Password"
            placeholderTextColor={colours.brown}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={() => onLogin()}>
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
