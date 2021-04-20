import React, {useState, useEffect} from 'react';
import {
  Container,
  Card,
  Title,
  CardItem,
  Left,
  Right,
  Body,
  Content,
  Header,
  Icon,
  Button,
  Text,
  Tabs,
  Tab,
} from 'native-base';
import {
  FlatList,
  View,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from 'react-native';

import common from '../../Global/stylesheet';
import Loading from '../../Component/Loading';
import useUserCred from '../../UserCredentials';
import {custReqQueries} from '../../serverQueries/Requester';

const PaymentOrderScreen = ({navigation}) => {
  const [payResp, setPayResp] = useState(null);

  const {userCred, userDetails, deleteUserCred} = useUserCred();

  const loadScreen = async () => {
    const [respErr, resp] = await custReqQueries.getOrders(
      userCred.relayToken,
      'request',
    );
    console.log('loaded resp', respErr, resp);
    if (respErr === null) {
      if (resp.status == 200) {
        setPayResp(resp.data);
      } else if (resp.status == 403) {
        ToastAndroid.show('Token expired\nLogin again', ToastAndroid.LONG);
        await deleteUserCred();
        setPayResp(null);
      } else {
        ToastAndroid.show(resp.data.error, ToastAndroid.LONG);
        setPayResp(null);
      }
    } else {
      ToastAndroid.show(respErr.message, ToastAndroid.LONG);
      setPayResp(null);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('your orders(payment) screen focused');
      loadScreen();
    });
    return unsubscribe;
  }, []);

  const renderItem = ({item}) => {
    const ordersList = item.request.orders.map((ord) => ord.product.name);

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('OrderDetails', {item: item})}>
        <Content style={common.cardContainer}>
          <Card style={common.card}>
            <CardItem>
              <Body>
                <Text>Transaction ID: {item._id}</Text>
                <Text>Supplier: {item.request.provider_id.name}</Text>
                <Text>Items: {ordersList.join(', ')}</Text>
                <Text>Payable Amount : {item.request.payment_amount}</Text>
                <Text>Status : Payment action needed</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </TouchableOpacity>
    );
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
            Welcome {userDetails.fName} {userDetails.lName}
          </Text>
        </Body>
        <Right />
      </Header>
      <View style={common.topBottomSep}></View>
      {payResp !== null ? (
        <>
          <FlatList
            data={payResp}
            initialNumToRender={7}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
          />
        </>
      ) : (
        <Loading />
      )}
    </Container>
  );
};

export default PaymentOrderScreen;
