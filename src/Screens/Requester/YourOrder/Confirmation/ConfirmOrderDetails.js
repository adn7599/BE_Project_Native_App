import React, {useState} from 'react';
import {StyleSheet, View, Modal, ScrollView, ToastAndroid} from 'react-native';
import {
  Container,
} from 'native-base';
import {sha256} from 'react-native-sha256';
import {Appbar,Button,Text,DataTable } from 'react-native-paper';
import moment from 'moment';

import useUserCred from '../../../../UserCredentials';
import {sign} from '../../../../serverQueries/User/sign';

const OrderDetailScreen = ({route, navigation}) => {
  const {item} = route.params;
  const {userDetails, userCred, deleteUserCred} = useUserCred();

  const listOrder = item.request.orders.map((ord) => {
    return (
      <DataTable.Row
        key={ord.product._id.toString()}
        style={{borderBottomWidth: 1}}>
        <DataTable.Cell key={ord.product.name}>
          {ord.product.name}
        </DataTable.Cell>
        <DataTable.Cell numeric key={ord.quantity.toString()}>
          {ord.quantity}
        </DataTable.Cell>
        <DataTable.Cell numeric key={ord.totalCost.toString()}>
          {ord.totalCost}
        </DataTable.Cell>
      </DataTable.Row>
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
    <Container>
      <Appbar.Header>
      <Appbar.BackAction
          onPress={() => navigation.pop()}
        />
        <Appbar.Content title="Your Order" />
      </Appbar.Header>
      <ScrollView style={{paddingHorizontal: 20}}>
        <View style={{marginTop: 20}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Transaction ID</Text>
          <Text style={{fontSize: 18}}>{item._id}</Text>
        </View>
        <View style={{marginTop: 20}}>
          <Text style={{paddingBottom: 10, fontSize: 20, fontWeight: 'bold'}}>
            {userCred.role === 'customer'
              ? 'Supplier Details'
              : 'Distributor Details'}
          </Text>
          <DataTable>
            <DataTable.Row>
              <DataTable.Cell style={{flex: 1}}>Id</DataTable.Cell>
              <DataTable.Cell style={{flex: 3}}>
                {item.request.provider_id._id}
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell style={{flex: 1}}>Name</DataTable.Cell>
              <DataTable.Cell style={{flex: 3}}>
                {item.request.provider_id.name}
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell style={{flex: 1}}>Address</DataTable.Cell>
              <DataTable.Cell style={{flex: 3}}>
                {item.request.provider_id.address}
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell style={{flex: 1}}>Mobile</DataTable.Cell>
              <DataTable.Cell style={{flex: 3}}>
                {item.request.provider_id.mobNo}
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell style={{flex: 1}}>E-mail</DataTable.Cell>
              <DataTable.Cell style={{flex: 3}}>
                {item.request.provider_id.email}
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </View>
        <View style={{marginTop: 20}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            Items Requested
          </Text>
          <DataTable style={{}}>
            <DataTable.Header style={{borderBottomWidth: 1}}>
              <DataTable.Title>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>Items</Text>
              </DataTable.Title>

              <DataTable.Title numeric>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>Quantity</Text>
              </DataTable.Title>
              <DataTable.Title numeric>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>Amount</Text>
              </DataTable.Title>
            </DataTable.Header>
            {listOrder}
          </DataTable>
        </View>
        <View style={{marginTop: 20,flexDirection : 'row'}}>
          <Text style={{fontSize : 18,fontWeight : 'bold'}}>
            Request time : 
          </Text>
          <Text style={{fontSize : 18}}>{' '}{moment(new Date(item.request.time)).format('lll')}</Text>
        </View>
        <View style={{marginTop: 20}}>
          <Text style={{fontSize : 18,fontWeight : 'bold'}}>Payment Details</Text>
          <DataTable>
            <DataTable.Row>
              <DataTable.Cell>Payment ID</DataTable.Cell>
              <DataTable.Cell>{item.payment.id}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Mode</DataTable.Cell>
              <DataTable.Cell>{item.payment.mode}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Payment time</DataTable.Cell>
              <DataTable.Cell>{moment(new Date(item.payment.time)).format('lll')}</DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </View>
        <View style={{marginTop: 20}}>
          <Text style={{fontSize : 18,fontWeight : 'bold'}}>
            Amount paid : {'₹ '}{item.request.payment_amount}
          </Text>
        </View>
        <View style={{alignSelf: 'center', padding: 20}}>
          <Button onPress={() => generateQR()} mode = 'contained'>
            <Text>Confirm</Text>
          </Button>
        </View>
      </ScrollView>
    </Container>
  );
};

export default OrderDetailScreen;
