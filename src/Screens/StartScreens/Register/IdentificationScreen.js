import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import colours from '../../../colours';
import {accountVerify, sendOTP} from '../../../serverQueries/User/register';

const IdentificationScreen = ({route, navigation}) => {
  const {role, roleTitle} = route.params;
  let textInput = useRef(null);
  const [identityNumber, setIdentityNumber] = useState('');
  const [focusInput, setFocusInput] = useState(true);
  const numberType =
    role === 'customer' ? 'Ration Card number' : 'Registration No.';

  const onChangePhone = (number) => {
    setIdentityNumber(number);
  };

  const onChangeFocus = () => {
    setFocusInput(true);
  };

  const onChangeBlur = () => {
    setFocusInput(false);
  };

  useEffect(() => {
    textInput.focus();
  }, []);

  const onPressBack = () => {
    navigation.pop();
  };

  const onPressContinue = async () => {
    if (identityNumber) {
      // Goto input OTP screen
      const [respErr, resp] = await accountVerify(role, identityNumber);
      console.log('log resp', respErr, resp);
      if (respErr == null) {
        if (resp.status == 200 && !resp.data.isRegistered) {
          const [otpErr, otpResp] = await sendOTP(role, identityNumber);
          console.log('log otp', otpErr, otpResp);
          if (otpErr == null) {
            if (otpResp.status == 200) {
              navigation.navigate('OTPInputScreen', {
                role: role,
                reg_id: identityNumber,
                mobNo: resp.data.Mob_no,
                otpToken: otpResp.data.token,
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
            `${resp.data.error ? resp.data.error : 'User already registered'}`,
            ToastAndroid.SHORT,
          );
        }
      } else {
        ToastAndroid.show(
          `Server Error : ${respErr.message}`,
          ToastAndroid.SHORT,
        );
      }
    } else {
      ToastAndroid.show(`Empty ${numberType}!!`, ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={50}
        behavior={'height'}
        style={styles.containerAvoidingView}>
        <Text style={styles.textSubtitle}>Welcome {roleTitle}</Text>
        <Text style={styles.textTitle}>
          Please provide your valid identity number
        </Text>
        <View
          style={[
            styles.containerInput,
            {
              borderBottomColor: colours.green,
            },
          ]}>
          <TextInput
            ref={(input) => (textInput = input)}
            style={styles.phoneInputStyle}
            placeholder={numberType}
            //keyboardType="numeric"
            maxLength={10}
            onChangeText={onChangePhone}
            secureTextEntry={false}
            onFocus={onChangeFocus}
            onBlur={onChangeBlur}
          />
        </View>
        <View style={styles.viewBottom}>
          <TouchableOpacity onPress={onPressBack}>
            <View style={styles.btnBack}>
              <Text style={styles.btnBackText}>Back</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressContinue}>
            <View
              style={[
                styles.btnContinue,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  backgroundColor: identityNumber ? colours.green : 'grey',
                },
              ]}>
              <Text style={styles.btnContinueText}>Continue</Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default IdentificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.light,
  },
  containerAvoidingView: {
    flex: 1,
    alignItems: 'stretch',
    paddingHorizontal: 10,
  },
  textTitle: {
    marginBottom: 50,
    fontSize: 20,
    fontWeight: 'bold',
    color: colours.brown,
  },
  textSubtitle: {
    marginTop: 50,
    marginBottom: 30,
    fontSize: 18,
    color: colours.brown,
  },
  containerInput: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderBottomWidth: 1.5,
  },
  phoneInputStyle: {
    flex: 1,
    marginLeft: 5,
    height: 50,
  },
  viewBottom: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 50,
  },
  btnContinue: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContinueText: {
    color: '#fff',
    alignItems: 'center',
  },
  btnBack: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colours.orange,
  },
  btnBackText: {
    color: '#fff',
    alignItems: 'center',
  },
});
