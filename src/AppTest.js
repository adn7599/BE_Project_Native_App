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
import {distProvQueries, suppProvQueries} from './serverQueries/Provider';
import {login, loginRelay, loginTTP} from './serverQueries/User/login';
import {sign, verifySign} from './serverQueries/User/sign';
import {custReqQueries, suppReqQueries} from './serverQueries/Requester/';
import {sha256} from 'react-native-sha256';

function App() {
  const [resp, setResp] = useState('loading');

  const role = 'customer';
  const reg_id = '1111111111';
  const relayToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiREEiLCJyZWdfaWQiOiJEQTExMTExMTExMTEiLCJpYXQiOjE2MTg1MTU1NzcsImV4cCI6MTYxODUxOTE3N30.a-p_eiudOr9JoJTMS_Te0PcaZPo7C2mqTjv0ApL5AnY';
  const ttpToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiREEiLCJyZWdfaWQiOiJEQTExMTExMTExMTEiLCJpYXQiOjE2MTg1MTU0OTYsImV4cCI6MTYxODUxOTA5Nn0.7WO4TUeW3MkGgNLn4vOU69tx8UBzN2VwIVcQ-N-DoiU';
  const password = '';

  useEffect(() => {
    (async () => {
      try {
        const resp = await distProvQueries.confirm(
          ttpToken,
          relayToken,
          '60788310fcbd212dc748a80b',
          'reqToken',
          'confirmToken',
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
