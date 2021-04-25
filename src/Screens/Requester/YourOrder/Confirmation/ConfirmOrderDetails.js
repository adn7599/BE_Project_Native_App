import React, {useState} from 'react';
import {StyleSheet, View, Modal, ScrollView, ToastAndroid} from 'react-native';
import {
  Container,
  Title,
  Left,
  Right,
  Body,
  Header,
  Icon,
  Button,
  Text,
} from 'native-base';
import {sha256} from 'react-native-sha256';

import common from '../../Global/stylesheet';
import useUserCred from '../../UserCredentials';
import {sign} from '../../serverQueries/User/sign';

const OrderDetailScreen = ({route, navigation}) => {
  const {item} = route.params;
  const {userDetails, userCred, deleteUserCred} = useUserCred();

  const listOrder = item.request.orders.map((ord) => {
    return (
      <Text style={common.text} key={ord.product._id.toString()}>
        {ord.product.name} {ord.quantity} {ord.totalCost}
      </Text>
    );
  });

  const generateQR = async () => {
    const token = item._id + '.' + item.payment.id;
    const hashToken = await sha256(token);
    const [respErr, resp] = await sign(userCred.ttpToken, hashToken);
    console.log('loaded resp', respErr, resp);
    if (respErr === null) {
      if (resp.status == 200) {
        navigation.navigate('ConfirmationQR', {
          transaction_id: item._id,
          transaction_type:
            userCred.role === 'customer' ? 'Cust_Supp' : 'Supp_Dist',
          requester_id: userCred.reg_id,
          provider_id: item.request.provider_id._id,
          requester_token: resp.data.sign,
        });
      } else if (resp.status == 403) {
        ToastAndroid.show('Token expired\nLogin again', ToastAndroid.LONG);
        await deleteUserCred();
      } else {
        ToastAndroid.show(resp.data.error, ToastAndroid.LONG);
      }
    } else {
      ToastAndroid.show(respErr.message, ToastAndroid.LONG);
    }
  };

  return (
    <Container style={common.container}>
      <Header style={common.headerColor}>
        <Left>
          <Icon
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            style={common.headerMenuBtn}
          />
        </Left>
        <Body>
          <Title style={common.headerText}>Your Order</Title>
        </Body>
      </Header>
      <Header style={common.welcomeHeader}>
        <Body>
          <Text style={common.welcomeHeaderText}>
            Welcome{' '}
            {userCred.role === 'customer'
              ? userDetails.fName + ' ' + userDetails.lName
              : userDetails.name}
          </Text>
        </Body>
        <Right />
      </Header>
      <ScrollView>
        <View style={common.leftTopIndent}>
          <Text style={common.text}>Transaction ID : {item._id}</Text>
        </View>
        <View style={common.leftTopIndent}>
          <Text style={[common.text, {paddingBottom: 10}]}>
            {userCred.role === 'customer' ? 'Supplier' : 'Distributor'} Details
          </Text>
          <Text style={common.text}>ID : {item.request.provider_id._id}</Text>
          <Text style={common.text}>
            Name : {item.request.provider_id.name}
          </Text>
          <Text style={common.text}>
            Address : {item.request.provider_id.address}
          </Text>
          <Text style={common.text}>
            MobNo : {item.request.provider_id.mobNo}
          </Text>
          <Text style={common.text}>
            email : {item.request.provider_id.email}
          </Text>
        </View>
        <View style={common.leftTopIndent}>
          <Text style={common.text}>Items Requested: </Text>
          {listOrder}
        </View>
        <View style={common.leftTopIndent}>
          <Text style={common.text}>
            request date : {new Date(item.request.time).toLocaleDateString()}
          </Text>
          <Text style={common.text}>
            request time : {new Date(item.request.time).toLocaleTimeString()}
          </Text>
        </View>
        <View style={common.leftTopIndent}>
          <Text style={common.text}>Payment ID : {item.payment.id}</Text>
        </View>
        <View style={common.leftTopIndent}>
          <Text style={common.text}>Mode : {item.payment.mode}</Text>
          <Text style={common.text}>
            Payment date : {new Date(item.payment.time).toLocaleDateString()}
          </Text>
          <Text style={common.text}>
            Payment time : {new Date(item.payment.time).toLocaleTimeString()}
          </Text>
        </View>
        <View style={common.leftTopIndent}>
          <Text style={common.text}>
            Amount paid : {item.request.payment_amount}
          </Text>
        </View>
        <View style={{alignSelf: 'center', padding: 20}}>
          <Button onPress={() => generateQR()}>
            <Text>Confirm</Text>
          </Button>
        </View>
      </ScrollView>
    </Container>
  );
};

export default OrderDetailScreen;
