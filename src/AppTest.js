import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import {
  sendOTP,
  verifyOTP,
  resetPassword,
} from './serverQueries/User/forgotPassword';
import {ROLE} from './serverQueries/config';
import {login, loginRelay, loginTTP} from './serverQueries/User/login';
import {sign, verifySign} from './serverQueries/User/sign';
import {changePassword} from './serverQueries/User/changePassword';

function App() {
  const [resp, setResp] = useState('loading');

  useEffect(() => {
    (async () => {
      try {
        const resp = await resetPassword(
          ROLE.CUSTOMER,
          '1111111111',
          'password',
          'ac66b5f1772ddda2659e179edeab547b69fa782c49facee8ee595ae03d2c711c.1618300761703',
        );
        console.log(resp);
        setResp(resp);
      } catch (error) {
        console.error(error.stack);
      }
    })();
    return () => {
      console.log('cleanup');
    };
  }, []);
  let output = 'No output';
  if (resp[0]) {
    output = resp[0].toString();
  } else {
    output = JSON.stringify(resp[1]);
  }

  return (
    <SafeAreaView>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <ScrollView>
          <Text>Hello hey</Text>
          <Text>Response</Text>
          <Text>{output}</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default App;
