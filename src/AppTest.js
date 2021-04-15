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
import {custReqQueries} from './serverQueries/Requester/';
import {sha256} from 'react-native-sha256';

function App() {
  const [resp, setResp] = useState('loading');

  const role = 'customer';
  const reg_id = '1111111111';
  const relayToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiY3VzdG9tZXIiLCJyZWdfaWQiOiIxMTExMTExMTExIiwiaWF0IjoxNjE4NDc4Mzg5LCJleHAiOjE2MTg0ODE5ODl9.APcLVdwk5VRdaY2mIIlyMuooO7JopYzbnCBiRvHqbXQ';
  const ttpToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiY3VzdG9tZXIiLCJyZWdfaWQiOiIxMTExMTExMTExIiwiaWF0IjoxNjE4NDc5MzMwLCJleHAiOjE2MTg0ODI5MzB9.u4PziQE49RlevHDvka5Xp-WAT5yhrKonfk88o5LnBEE';
  const password = '';

  useEffect(() => {
    (async () => {
      try {
        const resp = await custReqQueries.request(
          ttpToken,
          relayToken,
          reg_id,
          'SP1111111111',
          [{product: 1001, quantity: 3, totalCost: 60}],
          60,
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
