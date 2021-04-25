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
  Text,
} from 'native-base';
import {
  FlatList,
  View,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from 'react-native';

import common from '../../../Global/stylesheet';
import Loading from '../../../Component/Loading';
import useUserCred from '../../../UserCredentials';
import {suppProvQueries, distProvQueries} from '../../../serverQueries/Provider';

const ProviderDashboardScreen = ({navigation}) => {
  const [provResp, setProvResp] = useState(null);

  const {userCred, userDetails, deleteUserCred} = useUserCred();

  const selectedQueries =
    userCred.role === 'SP' ? suppProvQueries : distProvQueries;

  const loadScreen = async () => {
    const [payRespErr, payResp] = await selectedQueries.getOrders(
      userCred.relayToken,
      'payment',
    );
    console.log('loaded resp', payRespErr, payResp);
    if (payRespErr === null) {
      if (payResp.status == 200) {
        const [reqRespErr, reqResp] = await selectedQueries.getOrders(
          userCred.relayToken,
          'request',
        );
        if (reqRespErr === null) {
          if (reqResp.status == 200) {
            let tempArr = payResp.data;
            tempArr.push(...reqResp.data);
            setProvResp(tempArr);
          } else if (reqResp.status == 403) {
            ToastAndroid.show('Token expired\nLogin again', ToastAndroid.LONG);
            await deleteUserCred();
            setProvResp(null);
          } else {
            ToastAndroid.show(reqResp.data.error, ToastAndroid.LONG);
            setProvResp(null);
          }
        } else {
          ToastAndroid.show(reqRespErr.message, ToastAndroid.LONG);
          setProvResp(null);
        }
      } else if (payResp.status == 403) {
        ToastAndroid.show('Token expired\nLogin again', ToastAndroid.LONG);
        await deleteUserCred();
        setProvResp(null);
      } else {
        ToastAndroid.show(payResp.data.error, ToastAndroid.LONG);
        setProvResp(null);
      }
    } else {
      ToastAndroid.show(payRespErr.message, ToastAndroid.LONG);
      setProvResp(null);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Provider Dashboard screen focused');
      loadScreen();
    });
    return unsubscribe;
  }, []);

  const renderItem = ({item}) => {
    const ordersList = item.request.orders.map((ord) => ord.product.name);

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('RequestDetail', {item: item})}>
        <Content style={common.cardContainer}>
          <Card style={common.card}>
            <CardItem>
              <Body>
                <Text>Transaction ID: {item._id}</Text>
                <Text>
                  {userCred.role === 'SP' ? 'Customer' : 'Supplier'} :{' '}
                  {userCred.role === 'SP'
                    ? item.request.requester_id.fName +
                      ' ' +
                      item.request.requester_id.lName
                    : item.request.requester_id.name}
                </Text>
                <Text>Items: {ordersList.join(', ')}</Text>
                <Text>
                  {item.stageCompleted === 'request'
                    ? 'Payable Amount'
                    : 'Paid Amount'}{' '}
                  : {item.request.payment_amount}
                </Text>
                <Text>
                  Status :{' '}
                  {item.stageCompleted === 'request'
                    ? 'Payment Not done'
                    : 'Confirm Action needed'}
                </Text>
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
            Welcome {userDetails.name}
          </Text>
        </Body>
        <Right />
      </Header>
      <View style={common.topBottomSep}></View>
      {provResp !== null ? (
        <>
          <FlatList
            data={provResp}
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

export default ProviderDashboardScreen;
