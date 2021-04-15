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
import {custReqQueries, suppReqQueries} from './serverQueries/Requester/';
import {sha256} from 'react-native-sha256';

function App() {
  const [resp, setResp] = useState('loading');

  const role = 'customer';
  const reg_id = '1111111111';
  const relayToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiU1AiLCJyZWdfaWQiOiJTUDExMTExMTExMTEiLCJpYXQiOjE2MTg1MDk1NDYsImV4cCI6MTYxODUxMzE0Nn0.sJ0Aa7jlE3VtZkqHm5TpES2nhyLPHBjeDmyV7Of_oOM';
  const ttpToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiU1AiLCJyZWdfaWQiOiJTUDExMTExMTExMTEiLCJpYXQiOjE2MTg1MDk0MjIsImV4cCI6MTYxODUxMzAyMn0.c7C0OIVV9VFTwnyNNZ7sGo8yz2jRu3dn7_G4AeXFEVk';
  const password = '';

  useEffect(() => {
    (async () => {
      try {
        const resp = await suppReqQueries.payment(
          ttpToken,
          relayToken,
          '60788310fcbd212dc748a80b',
          '12341234',
          'cash',
          160,
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
          <Text>Response</Text>
          <Text>{output}</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default App;
