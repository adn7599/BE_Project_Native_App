import React, {useEffect, useState} from 'react';
import {
  View,
  BackHandler,
  StyleSheet,
  ToastAndroid,
  SafeAreaView,
} from 'react-native';
import {Button, Text, ActivityIndicator} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

import Loading from '../../../Component/Loading';
import {custReqQueries, suppReqQueries} from '../../../serverQueries/Requester';
import useUserCred from '../../../UserCredentials';

const RequestConfirmMsgScreen = ({route, navigation}) => {
  const {request} = route.params;
  const {deleteUserCred, userCred} = useUserCred();
  console.log(JSON.stringify(request, undefined, 4));
  const [reqResp, setReqResp] = useState(null);
  const selectedQueries =
    userCred.role === 'customer' ? custReqQueries : suppReqQueries;

  let [status, setStatus] = useState(null);

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
          `Your request has been sent to the provider.\n\nYou can make payment in Your Orders section\n\n Transaction ID: ${resp.data._id}`,
        );
        setStatus('success');
      } else if (resp.status == 403) {
        ToastAndroid.show('Token expired\nLogin again', ToastAndroid.LONG);
        await deleteUserCred();
      } else {
        setReqResp(resp.data.error);
        setStatus('unsuccess');
      }
    } else {
      setReqResp(respErr.message);
      setStatus('unsuccess');
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
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View>
        {reqResp !== null ? (
          <>
            <Icon
              name={status === 'success' ? 'check-circle' : 'times-circle'}
              size={120}
              color={status === 'success' ? 'green' : 'red'}
              style={{alignSelf: 'center'}}
            />
            <Text style={Styles.text}>{reqResp}</Text>
            <Text style={Styles.text}>Go to home screen</Text>
            <View style={{paddingTop: 20, alignSelf: 'center'}}>
              <Button
              uppercase = {false}
                mode="contained"
                onPress={() => navigation.popToTop()}
                style={{width: 100, borderRadius: 5}}>
                Home
              </Button>
            </View>
          </>
        ) : (
          <Loading />
        )}
      </View>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  text: {
    padding: 10,
    textAlign: 'center',
    fontSize: 17,
  },
});

export default RequestConfirmMsgScreen;
