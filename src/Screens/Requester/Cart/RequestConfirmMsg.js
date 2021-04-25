import React, {useEffect, useState} from 'react';
import {View, BackHandler, StyleSheet, ToastAndroid} from 'react-native';
import {Button, Text} from 'native-base';

import common from '../../../Global/stylesheet';
import Loading from '../../../Component/Loading';
import {custReqQueries,suppReqQueries} from '../../../serverQueries/Requester';
import useUserCred from '../../../UserCredentials';

const RequestConfirmMsgScreen = ({route, navigation}) => {
  const {request} = route.params;
  const {deleteUserCred,userCred} = useUserCred();
  console.log(JSON.stringify(request, undefined, 4));
  const [reqResp, setReqResp] = useState(null);
  const selectedQueries =
    userCred.role === 'customer' ? custReqQueries : suppReqQueries;

  const makeRequest = async () => {
    const [respErr, resp] = await selectedQueries.request(
      request.ttpToken,
      request.relayToken,
      request.requester_id,
      request.provider_id,
      request.ordersArray,
      request.payment_amount,
    );
    console.log('loaded resp', respErr, resp);
    if (respErr === null) {
      if (resp.status == 200) {
        setReqResp(
          `Your request is sent to provider, you can go and purchase your commodities.\n Transaction ID: ${resp.data._id}`,
        );
      } else if (resp.status == 403) {
        ToastAndroid.show('Token expired\nLogin again', ToastAndroid.LONG);
        await deleteUserCred();
      } else {
        setReqResp(resp.data.error);
      }
    } else {
      setReqResp(respErr.message);
    }
  };

  useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    makeRequest();
    return () => backHandler.remove();
  }, []);

  return (
    <View style={[common.container, common.flexOne]}>
      <View style={Styles.textView}>
        {reqResp !== null ? (
          <>
            <Text style={Styles.text}>{reqResp}</Text>
          </>
        ) : (
          <Loading />
        )}
        <Text style={common.topBottomSep}>Goto home screen</Text>
        <View style={common.topBottomSep}>
          <Button onPress={() => navigation.navigate('Home')}>
            <Text>Home</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  textView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    paddingHorizontal: 10,
    textAlign: 'center',
    fontSize: 20,
  },
});

export default RequestConfirmMsgScreen;
