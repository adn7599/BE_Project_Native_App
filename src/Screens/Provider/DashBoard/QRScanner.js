'use strict';

import React, {Component} from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  ToastAndroid,
} from 'react-native';

import {sha256} from 'react-native-sha256';

import QRCodeScanner from 'react-native-qrcode-scanner';
import useUserCred from '../../../UserCredentials';
import {sign} from '../../../serverQueries/User/sign';
import {suppProvQueries, distProvQueries} from '../../../serverQueries/Provider/';

const ScanScreen = ({route, navigation}) => {
  const {userCred, deleteUserCred} = useUserCred();
  const {item} = route.params;

  const selectedQueries =
    userCred.role === 'SP' ? suppProvQueries : distProvQueries;

  const onSuccess = async (qrResult) => {
    const rawData = qrResult.data;
    const data = JSON.parse(rawData);
    console.log(data);

    //setting my vars
    const myProviderId = userCred.reg_id;
    const myRequesterId = item.request.requester_id._id;
    const myTransId = item._id;
    const myTransType = userCred.role == 'SP' ? 'Cust_Supp' : 'Supp_Dist';

    //matching the content
    if (
      myProviderId === data.provider_id &&
      myRequesterId === data.requester_id &&
      myTransId === data.transaction_id &&
      myTransType === data.transaction_type &&
      typeof data.requester_token === 'string'
    ) {
      console.log('Valid QR Code');
      const token = data.requester_token;
      const hashToken = await sha256(token);
      const [signRespErr, signResp] = await sign(userCred.ttpToken, hashToken);

      console.log('loaded resp', signRespErr, signResp);
      if (signRespErr === null) {
        if (signResp.status == 200) {
          //final request to confirm
          const [confRespErr, confResp] = await selectedQueries.confirm(
            userCred.ttpToken,
            userCred.relayToken,
            myTransId,
            data.requester_token,
            signResp.data.sign,
          );

          if (confRespErr === null) {
            if (confResp.status == 200) {
              //Confirmed successfully
              ToastAndroid.show(
                'Transaction confirmed successfully!',
                ToastAndroid.LONG,
              );
            } else if (confResp.status == 403) {
              ToastAndroid.show(
                'Token expired\nLogin again',
                ToastAndroid.LONG,
              );
              await deleteUserCred();
            } else {
              ToastAndroid.show(confResp.data.error, ToastAndroid.LONG);
            }
          } else {
            ToastAndroid.show(confRespErr.message, ToastAndroid.LONG);
          }
        } else if (signResp.status == 403) {
          ToastAndroid.show('Token expired\nLogin again', ToastAndroid.LONG);
          await deleteUserCred();
        } else {
          ToastAndroid.show(signResp.data.error, ToastAndroid.LONG);
        }
      } else {
        ToastAndroid.show(signRespErr.message, ToastAndroid.LONG);
      }
    } else {
      ToastAndroid.show('Invalid QR Code Scanned!!!', ToastAndroid.LONG);
    }
    navigation.popToTop();
  };
  return (
    <QRCodeScanner
      onRead={onSuccess}
      //flashMode={RNCamera.Constants.FlashMode.torch}
      showMarker={true}
      markerStyle = {{borderColor : 'red',borderWidth : 5,}}
      
      cameraStyle = {{backfaceVisibility : 'hidden'}}
      topContent={
        <Text style={[styles.heading]}>
          Scan your requester's QR Code to confirm the transaction
        </Text>
      }
    />
  );
};

const styles = StyleSheet.create({
  heading: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    padding: 32,
    color: '#777',
    fontWeight: '500',
    color: '#000',
  },
});

export default ScanScreen;
