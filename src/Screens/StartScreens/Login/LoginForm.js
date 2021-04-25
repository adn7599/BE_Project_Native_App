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
import login from '../../../serverQueries/User/login';
import {accountVerify} from '../../../serverQueries/User/register';
import {sendOTP} from '../../../serverQueries/User/forgotPassword';
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
      const [respErr, ttpToken, relayToken] = await login(
        role,
        regId,
        password,
      );
      console.log('log resp', respErr, ttpToken, relayToken);
      if (respErr == null) {
        saveUserCred(role, regId, ttpToken, relayToken);
      } else {
        ToastAndroid.show(
          respErr instanceof Error ? respErr.message : respErr,
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

  const onForgotPassword = async () => {
    if (regId) {
      // Goto input OTP screen
      const [respErr, resp] = await accountVerify(role, regId);
      console.log('log resp', respErr, resp);
      if (respErr == null) {
        if (resp.status == 200 && resp.data.isRegistered) {
          const [otpErr, otpResp] = await sendOTP(role, regId);
          console.log('log otp', otpErr, otpResp);
          if (otpErr == null) {
            if (otpResp.status == 200) {
              navigation.navigate('OTPInputScreen', {
                role: role,
                reg_id: regId,
                mobNo: resp.data.Mob_no,
                otpToken: otpResp.data.token,
                intent: 'forgotPassword',
              });
            } else {
              ToastAndroid.show(`${otpResp.data.error}`, ToastAndroid.SHORT);
            }
          } else {
            ToastAndroid.show(
              `Server Error : ${otpErr.message}`,
              ToastAndroid.SHORT,
            );
          }
        } else {
          ToastAndroid.show(
            `${resp.data.error ? resp.data.error : 'User not registered'}`,
            ToastAndroid.SHORT,
          );
        }
      } else {
        ToastAndroid.show(
          `Server Error : ${respErr.message}`,
          ToastAndroid.LONG,
        );
      }
    } else {
      ToastAndroid.show(`Empty ${numberType}!!`, ToastAndroid.SHORT);
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
            maxLength={12}
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
          <Text
            style={{color: 'blue', padding: 6}}
            onPress={() => onForgotPassword()}>
            forgot password?
          </Text>
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
