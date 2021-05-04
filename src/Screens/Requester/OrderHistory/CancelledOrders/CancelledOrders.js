import React, {useState, useEffect} from 'react';
import {
  Container,
} from 'native-base';
import {FlatList, View, TouchableOpacity, ToastAndroid} from 'react-native';
import {Appbar,Button,Text,Card } from 'react-native-paper';

import common from '../../../../Global/stylesheet';
import Loading from '../../../../Component/Loading';
import useUserCred from '../../../../UserCredentials';
import {custReqQueries, suppReqQueries} from '../../../../serverQueries/Requester';

const CancelledOrdersScreen = ({navigation}) => {
  const [cancelledResp, setCancelledResp] = useState(null);

  const {userCred, userDetails, deleteUserCred} = useUserCred();

  const selectedQueries =
    userCred.role === 'customer' ? custReqQueries : suppReqQueries;

  const loadScreen = async () => {
    const [respErr, resp] = await selectedQueries.getOrders(
      userCred.relayToken,
      'cancelled',
    );
    console.log('loaded resp', respErr, resp);
    if (respErr === null) {
      if (resp.status == 200) {
        setCancelledResp(resp.data);
      } else if (resp.status == 403) {
        ToastAndroid.show('Token expired\nLogin again', ToastAndroid.LONG);
        await deleteUserCred();
        setCancelledResp(null);
      } else {
        ToastAndroid.show(resp.data.error, ToastAndroid.LONG);
        setCancelledResp(null);
      }
    } else {
      ToastAndroid.show(respErr.message, ToastAndroid.LONG);
      setCancelledResp(null);
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
          navigation.navigate('CancelledOrderDetails', {item: item})
        }>
        <Card
          style={{
            marginHorizontal: 20,
            marginBottom: 20,
            elevation: 12,
            borderRadius: 15,
            
          }}>
          <Card.Content style={{flexDirection: 'row',justifyContent : 'space-between'}}>
            <View>
              <Text style ={{fontSize : 17,fontWeight : 'bold',paddingBottom : 10}}>{ordersList.join(', ')}</Text>
              <Text style ={{fontSize : 17}}>
                {userCred.role === 'customer' ? 'Supplier' : 'Distributor'} :{' '}
                {item.request.provider_id.name}
              </Text>
            </View>
            <Text style = {{fontWeight : 'bold',fontSize : 20}}>{'₹ '} {item.request.payment_amount}</Text>
          </Card.Content>
          <Card.Content style={{paddingTop:5}}>
            <Text style ={{fontSize : 17}}>Cancellation date : {new Date(item.cancel.time).toLocaleDateString()}
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
        <Appbar.Content title="Order History" />
      </Appbar.Header>
      {cancelledResp !== null ? (
        <>
          <FlatList
            data={cancelledResp}
            initialNumToRender={7}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            ListHeaderComponent={
              <View style={{padding: 20}}>
                <Text style={{fontWeight: 'bold', fontSize: 20}}>
                  Cancelled transaction
                </Text>
              </View>
            }
            ListHeaderComponentStyle={{paddingBottom: 20}}
          />
        </>
      ) : (
        <Loading />
      )}
    </Container>
  );
};

export default CancelledOrdersScreen;
