import React, {useState} from 'react';
import {
  View,
  ActivityIndicator,
  Modal,
  StyleSheet,
  Alert,
  Pressable,
} from 'react-native';
import {Button, Container, Text, Title} from 'native-base';
import QRCode from 'react-native-qrcode-svg';

/**
 * {
 * transaction_id : 'hiakshc5879d6scbsda'
 * transaction_type : 'cust_supp/supp_diss'
 * requester_id : '11111111'
 * provider_id : 'SP11111111'
 * requester_token : 'scsdcsdx56488541sacsa',
 *
 * }
 */

const PaymentInfo =
  'Upi transaction ID\n11052115436\n\nTo: Ajay Pandit\najaypandit@upi\n\nFrom: Ajay\n123456@upi\n\nAmount Paid: 500\n\nApr 16, 12.00 PM';

const ConfirmationQRScreen = ({route, navigation}) => {
  const displayObj = route.params;

  return (
    <Container style={Styles.container}>
      <View style={Styles.qrcodeView}>
        <QRCode
          value={JSON.stringify(displayObj)}
          size={250}
          logoBackgroundColor="transparent"
        />
      </View>
    </Container>
  );
};

const Styles = StyleSheet.create({
  container: {
    backgroundColor: '#DCDCDC',
  },
  qrcodeView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
export default ConfirmationQRScreen;
