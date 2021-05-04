import React, {useState, useEffect} from 'react';
import {
  Container,
  Header,
  Body
} from 'native-base';
import {
  FlatList,
  View,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import {
  Appbar,
  Card,
  Text,
} from 'react-native-paper';

import Loading from '../../../Component/Loading';
import useUserCred from '../../../UserCredentials';
import {
  suppProvQueries,
  distProvQueries,
} from '../../../serverQueries/Provider';

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
        <Card
          style={{
            marginHorizontal: 20,
            marginBottom: 20,
            elevation: 12,
            borderRadius: 15,
          }}>
          <Card.Content
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text
                style={{fontSize: 17, fontWeight: 'bold', paddingBottom: 10}}>
                {ordersList.join(', ')}
              </Text>
              <Text style={{fontSize: 17}}>
                {userCred.role === 'SP' ? 'Customer' : 'Supplier'} :{' '}
                {userCred.role === 'SP'
                  ? item.request.requester_id.fName +
                    ' ' +
                    item.request.requester_id.lName
                  : item.request.requester_id.name}
              </Text>
            </View>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>
              {'₹ '} {item.request.payment_amount}
            </Text>
          </Card.Content>
          <Card.Content>
            <Text style={{fontSize: 17}}>
              {item.stageCompleted === 'request'
                ? `Request date : ${new Date(
                    item.request.time,
                  ).toLocaleDateString()}`
                : `Payment date : ${new Date(
                    item.payment.time,
                  ).toLocaleDateString()}`}
            </Text>
            <Text style={{fontSize: 17}}>
              Status :{' '}
              {item.stageCompleted === 'request'
                ? 'Payment Not done'
                : 'Confirm Action needed'}
            </Text>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <Container>
      <Appbar.Header>
        <Appbar.Action
          size={33}
          icon="menu"
          onPress={() => navigation.openDrawer()}
        />
        <Appbar.Content title="Home" />
      </Appbar.Header>
      {provResp !== null ? (
        <>
          <FlatList
            data={provResp}
            initialNumToRender={7}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            ListHeaderComponent={
              <>
                <Header
                  style={{
                    backgroundColor: '#E4E',
                    height: 40,
                  }}>
                  <Body>
                    <Text
                      style={{
                        fontSize: 20,
                        paddingLeft: 20,
                        color: '#fff',
                      }}>
                      Welcome, {userDetails.name}!
                    </Text>
                  </Body>
                </Header>
                <View style={{padding: 20}}>
                  <Text style={{fontWeight: 'bold', fontSize: 20}}>
                    Orders for you
                  </Text>
                </View>
              </>
            }
            ListHeaderComponentStyle={{paddingBottom: 10}}
          />
        </>
      ) : (
        <Loading />
      )}
    </Container>
  );
};

export default ProviderDashboardScreen;
