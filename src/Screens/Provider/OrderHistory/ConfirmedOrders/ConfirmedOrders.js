import React, {useState, useEffect} from 'react';
import {Container} from 'native-base';
import {FlatList, View, TouchableOpacity, ToastAndroid} from 'react-native';
import {Appbar, Button, Text, Card} from 'react-native-paper';

import Loading from '../../../../Component/Loading';
import useUserCred from '../../../../UserCredentials';
import {
  suppProvQueries,
  distProvQueries,
} from '../../../../serverQueries/Provider';
import MyContainer from '../../../../Component/MyContainer';

const ConfirmedOrdersScreen = ({navigation}) => {
  const [completeResp, setCompleteResp] = useState(null);

  const {userCred, userDetails, deleteUserCred} = useUserCred();

  const selectedQueries =
    userCred.role === 'SP' ? suppProvQueries : distProvQueries;

  const loadScreen = async () => {
    const [respErr, resp] = await selectedQueries.getOrders(
      userCred.relayToken,
      'confirm',
    );
    console.log('loaded resp', respErr, resp);
    if (respErr === null) {
      if (resp.status == 200) {
        setCompleteResp(resp.data);
      } else if (resp.status == 403) {
        ToastAndroid.show('Token expired\nLogin again', ToastAndroid.LONG);
        await deleteUserCred();
      } else {
        ToastAndroid.show(resp.data.error, ToastAndroid.LONG);
        setCompleteResp(null);
      }
    } else {
      ToastAndroid.show(respErr.message, ToastAndroid.LONG);
      setCompleteResp(null);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Confirmed order history screen focused');
      loadScreen();
    });
    return unsubscribe;
  }, []);

  const renderItem = ({item}) => {
    const ordersList = item.request.orders.map((ord) => ord.product.name);

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ConfirmedOrderDetails', {item: item})
        }>
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
                {userCred.role === 'SP'
                  ? `Customer : ${item.request.requester_id.fName} ${item.request.requester_id.lName}`
                  : `Supplier : ${item.request.requester_id.name}`}
              </Text>
            </View>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>
              {'₹ '} {item.payment.amount}
            </Text>
          </Card.Content>
          <Card.Content style={{paddingTop: 5}}>
            <Text style={{fontSize: 17}}>
              Confirmation date :{' '}
              {new Date(item.confirm.time).toLocaleDateString()}
            </Text>
          </Card.Content>
        </Card>
      </TouchableOpacity>
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
        <Appbar.Content color="white" title="Order History" />
      </Appbar.Header>
      {completeResp !== null ? (
        <>
          <FlatList
            data={completeResp}
            initialNumToRender={7}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            ListHeaderComponent={
              <View style={{padding: 20}}>
                <Text style={{fontWeight: 'bold', fontSize: 20}}>
                  Completed transaction
                </Text>
              </View>
            }
            ListHeaderComponentStyle={{paddingBottom: 20}}
          />
        </>
      ) : (
        <Loading />
      )}
    </MyContainer>
  );
};

export default ConfirmedOrdersScreen;
