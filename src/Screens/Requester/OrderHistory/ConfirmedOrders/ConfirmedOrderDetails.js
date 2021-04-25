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

import common from '../../../../Global/stylesheet';
import useUserCred from '../../../../UserCredentials';

const ConfirmedOrderDetailScreen = ({route, navigation}) => {
  const {item} = route.params;
  const {userDetails, userCred, deleteUserCred} = useUserCred();

  const listOrder = item.request.orders.map((ord) => {
    return (
      <Text style={common.text} key={ord.product._id.toString()}>
        {ord.product.name} {ord.quantity} {ord.totalCost}
      </Text>
    );
  });

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
            Request date : {new Date(item.request.time).toLocaleDateString()}
          </Text>
          <Text style={common.text}>
            Request time : {new Date(item.request.time).toLocaleTimeString()}
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
          <Text style={common.text}>Confirmed Details : </Text>
        </View>
        <View style={common.leftTopIndent}>
          <Text style={common.text}>
            Confirmed date : {new Date(item.confirm.time).toLocaleDateString()}
          </Text>
          <Text style={common.text}>
            Confirmed time : {new Date(item.confirm.time).toLocaleTimeString()}
          </Text>
        </View>
        <View style={common.leftTopIndent}>
          <Text style={common.text}>
            Amount paid : {item.request.payment_amount}
          </Text>
        </View>
        <View style={{alignSelf: 'center', padding: 20}}>
          <Button onPress={() => navigation.goBack()}>
            <Text>Okay</Text>
          </Button>
        </View>
      </ScrollView>
    </Container>
  );
};

export default ConfirmedOrderDetailScreen;
