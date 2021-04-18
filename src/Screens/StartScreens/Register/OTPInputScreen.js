import React, {useState, useEffect, useRef} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native';
import colours from '../../../colours';

import {sendOTP, verifyOTP} from '../../../serverQueries/User/register';

const OTPInputScreen = ({route, navigation}) => {
  const {role, reg_id, mobNo, otpToken} = route.params;
  let textInput = useRef(null);
  let clockCall = null;
  const lengthInput = 6;
  const defaultCountdown = 6;
  const [internalVal, setInternalVal] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [focusInput, setFocusInput] = useState(true);
  const [countdown, setCountdown] = useState(defaultCountdown);
  const [enableResend, setEnableResend] = useState(false);
  const [otpTokenState,setOtpTokenState] = useState(otpToken);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    clockCall = setInterval(() => {
      decrementClock();
    }, 1000);
    return () => {
      clearInterval(clockCall);
    };
  });

  const decrementClock = () => {
    if (countdown === 0) {
      setEnableResend(true);
      setCountdown(0);
      clearInterval(clockCall);
    } else {
      setCountdown(countdown - 1);
    }
  };

  const onResendOTP = async () => {
    if (enableResend) {
      // eslint-disable-next-line no-alert
      const [otpErr, otpResp] = await sendOTP(role, reg_id);
      console.log('log otp', otpErr, otpResp);
      if (otpErr == null) {
        if (otpResp.status == 200) {
          setOtpTokenState(otpResp.data.token);
          setCountdown(defaultCountdown);
          setEnableResend(false);
          clearInterval(clockCall);
          this.clockCall = setInterval(() => {
            decrementClock(0);
          }, 1000);
        } else {
          ToastAndroid.show(`${otpResp.data.error}`, ToastAndroid.SHORT);
        }
      } else {
        ToastAndroid.show(
          `Server Error : ${otpErr.message}`,
          ToastAndroid.SHORT,
        );
      }
    }
  };

  const onChangeNumber = () => {
    setInternalVal('');
    navigation.pop();
  };

  const onChangeText = async (val) => {
    setInternalVal(val);
    //console.log(val)
    if (val.length === lengthInput) {
      const [respErr, resp] = await verifyOTP(role, reg_id, val, otpTokenState);
      console.log('log resp', respErr, resp);
      if (respErr == null) {
        if (resp.status == 200) {
          navigation.navigate('SetPasswordScreen', {
            role: role,
            reg_id: reg_id,
            regToken: resp.data.token,
          });
        } else {
          ToastAndroid.show(`${resp.data.error}`, ToastAndroid.SHORT);
        }
      } else {
        ToastAndroid.show(
          `Server Error : ${respErr.message}`,
          ToastAndroid.SHORT,
        );
      }
      // Check if OTP is correct, then go forward
    }
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

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={50}
        behavior={'height'}
        style={styles.containerAvoidingView}>
        <Text style={styles.textTitle}>
          Input your OTP code sent via SMS to {mobNo}
        </Text>
        <TextInput
          ref={(input) => (textInput = input)}
          onChangeText={onChangeText}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{width: 0, height: 0}}
          value={internalVal}
          maxLength={lengthInput}
          returnKeyType="done"
          keyboardType="numeric"
          onFocus={onChangeFocus}
          onBlur={onChangeBlur}
        />
        <View style={styles.containerInput}>
          {Array(lengthInput)
            .fill()
            .map((data, index) => (
              <View
                key={index}
                style={[
                  styles.cellView,
                  {
                    borderBottomColor:
                      index === internalVal.length
                        ? colours.orange
                        : colours.green,
                  },
                ]}>
                <Text style={styles.cellText} onPress={() => textInput.focus()}>
                  {internalVal && internalVal.length > 0
                    ? internalVal[index]
                    : ''}
                </Text>
              </View>
            ))}
        </View>
        <View style={styles.bottomView}>
          <TouchableOpacity onPress={onChangeNumber}>
            <View style={styles.btnChangeNumber}>
              <Text style={styles.textChangeNumber}>Change ID</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onResendOTP}
            disabled={enableResend ? false : true}>
            <View style={styles.btnResend}>
              <Text
                style={[
                  styles.textResend,
                  // eslint-disable-next-line react-native/no-inline-styles
                  {
                    color: enableResend ? '#244DB7' : 'grey',
                  },
                ]}>
                Resend OTP ({countdown})
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default OTPInputScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.light,
  },
  containerAvoidingView: {
    flex: 1,
    alignItems: 'center',
  },
  textTitle: {
    marginBottom: 50,
    marginTop: 50,
    fontSize: 20,
    color: colours.brown,
    textAlign: 'center',
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellView: {
    paddingVertical: 10,
    width: 40,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1.5,
  },
  cellText: {
    textAlign: 'center',
    fontSize: 16,
  },
  bottomView: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 50,
  },
  btnChangeNumber: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  textChangeNumber: {
    color: '#244DB7',
    alignItems: 'center',
    fontSize: 16,
  },
  btnResend: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  textResend: {
    color: '#244DB7',
    alignItems: 'center',
    fontSize: 16,
  },
});
