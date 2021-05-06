import React from 'react';
import {StyleSheet, View,ScrollView,} from 'react-native';
import {
  Container,
} from 'native-base';
import {Appbar, Button, Text, DataTable} from 'react-native-paper';
import moment from 'moment';

import useUserCred from '../../../../UserCredentials';

const ConfirmedOrderDetailScreen = ({route, navigation}) => {
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

  return (
    <Container>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.pop()} />
        <Appbar.Content title="Your Order" />
      </Appbar.Header>
      <ScrollView style={{paddingHorizontal: 20}}>
        <View style={{marginTop: 20}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Transaction ID</Text>
          <Text style={{fontSize: 18}}>{item._id}</Text>
        </View>
        <View style={{marginTop: 20}}>
          <Text style={{paddingBottom: 10, fontSize: 20, fontWeight: 'bold'}}>
            {userCred.role === 'SP' ? 'Customer' : 'Supplier'} Details
          </Text>
          <DataTable>
            <DataTable.Row>
              <DataTable.Cell style={{flex: 1}}>Id</DataTable.Cell>
              <DataTable.Cell style={{flex: 3}}>
                {item.request.requester_id._id}
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell style={{flex: 1}}>Name</DataTable.Cell>
              <DataTable.Cell style={{flex: 3}}>
                {userCred.role === 'SP'
                  ? item.request.requester_id.fName +
                    ' ' +
                    item.request.requester_id.lName
                  : item.request.requester_id.name}
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell style={{flex: 1}}>Address</DataTable.Cell>
              <DataTable.Cell style={{flex: 3}}>
                {item.request.requester_id.address}
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell style={{flex: 1}}>Mobile</DataTable.Cell>
              <DataTable.Cell style={{flex: 3}}>
                {item.request.requester_id.mobNo}
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell style={{flex: 1}}>E-mail</DataTable.Cell>
              <DataTable.Cell style={{flex: 3}}>
                {item.request.requester_id.email}
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
        <View style={{marginTop: 20, flexDirection: 'row'}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Request time :</Text>
          <Text style={{fontSize: 18}}>
            {' '}
            {moment(new Date(item.request.time)).format('lll')}
          </Text>
        </View>
        <View style={{marginTop: 20, flexDirection: 'row'}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Cancel time :</Text>
          <Text style={{fontSize: 18}}>
            {' '}
            {moment(new Date(item.cancel.time)).format('lll')}
          </Text>
        </View>
        <View style={{marginTop: 20}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            Total cost : {'₹ '}
            {item.request.payment_amount}
          </Text>
        </View>
        <View style={{alignSelf: 'center', padding: 20}}>
          <Button onPress={() => navigation.goBack()} mode ='contained'>
            Okay
          </Button>
        </View>
      </ScrollView>
    </Container>
  );
};

export default ConfirmedOrderDetailScreen;