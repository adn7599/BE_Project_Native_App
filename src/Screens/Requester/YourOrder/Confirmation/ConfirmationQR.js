import React, {useState} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {Button, Text} from 'react-native-paper';
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
    <SafeAreaView style={Styles.qrcodeView}>
      <View>
        <QRCode
          value={JSON.stringify(displayObj)}
          size={250}
          logoBackgroundColor="transparent"
        />
      </View>
      <View style={{margin: 20}}>
        <Text style={{fontSize: 18, textAlign: 'center'}}>
          Show this QR code to the provider for confirmation
        </Text>
      </View>
      <View>
        <Button uppercase = {false} onPress = {() => navigation.popToTop()} mode = 'contained'>
          Done
        </Button>
      </View>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  qrcodeView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
export default ConfirmationQRScreen;
