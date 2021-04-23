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

const RequestDetailScreen = ({route, navigation}) => {
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
            Welcome {userDetails.name}
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
            {userCred.role === 'SP' ? 'Customer' : 'Supplier'} Details
          </Text>
          <Text style={common.text}>ID : {item.request.requester_id._id}</Text>
          <Text style={common.text}>
            Name :{' '}
            {userCred.role === 'SP'
              ? item.request.requester_id.fName +
                ' ' +
                item.request.requester_id.lName
              : item.request.requester_id.name}
          </Text>
          <Text style={common.text}>
            Address : {item.request.requester_id.address}
          </Text>
          <Text style={common.text}>
            MobNo : {item.request.requester_id.mobNo}
          </Text>
          <Text style={common.text}>
            email : {item.request.requester_id.email}
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
        {item.stageCompleted === 'payment' ? (
          <>
            <View style={common.leftTopIndent}>
              <Text style={common.text}>Payment ID : {item.payment.id}</Text>
            </View>
            <View style={common.leftTopIndent}>
              <Text style={common.text}>Mode : {item.payment.mode}</Text>
              <Text style={common.text}>
                Payment date :{' '}
                {new Date(item.payment.time).toLocaleDateString()}
              </Text>
              <Text style={common.text}>
                Payment time :{' '}
                {new Date(item.payment.time).toLocaleTimeString()}
              </Text>
            </View>
            <View style={common.leftTopIndent}>
              <Text style={common.text}>
                Amount paid : {item.request.payment_amount}
              </Text>
            </View>
            <View style={{alignSelf: 'center', padding: 20}}>
              <Button onPress={() => {}}>
                <Text>Confirm</Text>
              </Button>
            </View>
          </>
        ) : (
          <>
            <View style={common.leftTopIndent}>
              <Text style={common.text}>
                Amount to be paid : {item.request.payment_amount}
              </Text>
            </View>
            <View style={{alignSelf: 'center', padding: 20}}>
              <Button onPress={() => navigation.goBack()}>
                <Text>Back</Text>
              </Button>
            </View>
          </>
        )}
      </ScrollView>
    </Container>
  );
};

export default RequestDetailScreen;
