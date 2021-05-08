import React, {useState, useEffect} from 'react';
import {CardItem, Container} from 'native-base';
import {
  FlatList,
  View,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import {Appbar, Text, Card} from 'react-native-paper';

import Loading from '../../../../Component/Loading';
import useUserCred from '../../../../UserCredentials';
import {
  custReqQueries,
  suppReqQueries,
} from '../../../../serverQueries/Requester';
import MyContainer from '../../../../Component/MyContainer';

const PaymentOrderScreen = ({navigation}) => {
  const [payResp, setPayResp] = useState(null);

  const {userCred, userDetails, deleteUserCred} = useUserCred();

  const selectedQueries =
    userCred.role === 'customer' ? custReqQueries : suppReqQueries;

  const loadScreen = async () => {
    const [respErr, resp] = await selectedQueries.getOrders(
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
      <Card
        style={{
          marginHorizontal: 20,
          marginBottom: 20,
          borderRadius: 15,
          borderWidth: 2,
          borderColor: 'lightgrey',
        }}
        onPress={() => navigation.navigate('PaymentOrderDetail', {item: item})}>
        <Card.Content
          style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <Text style={{fontSize: 20, fontWeight: 'bold', paddingBottom: 5}}>
              {ordersList.join(', ')}
            </Text>
            <Text style={{fontSize: 17}}>
              {userCred.role === 'customer' ? 'Supplier' : 'Distributor'} :{' '}
              {item.request.provider_id.name}
            </Text>
          </View>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>
            {'₹ '} {item.request.payment_amount}
          </Text>
        </Card.Content>
        <Card.Content style={{paddingTop: 5}}>
          <Text style={{fontSize: 17}}>
            Request date : {new Date(item.request.time).toLocaleDateString()}
          </Text>
        </Card.Content>
      </Card>
    );
  };

  return (
    <MyContainer>
      <Appbar.Header>
        <Appbar.Action
          color="white"
          size={33}
          icon="menu"
          onPress={() => navigation.openDrawer()}
        />
        <Appbar.Content color="white" title="Your Order" />
      </Appbar.Header>
      {payResp !== null ? (
        <>
          <FlatList
            data={payResp}
            initialNumToRender={7}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            ListHeaderComponent={
              <View style={{padding: 20}}>
                <Text style={{fontWeight: 'bold', fontSize: 20}}>
                  Pending payment
                </Text>
              </View>
            }
            ListHeaderComponentStyle={{paddingBottom: 20}}
            ListEmptyComponent={
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 17, fontStyle: 'italic'}}>
                  List Empty!!
                </Text>
              </View>
            }
          />
        </>
      ) : (
        <Loading />
      )}
    </MyContainer>
  );
};

export default PaymentOrderScreen;
