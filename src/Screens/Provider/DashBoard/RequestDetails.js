import React, {useState} from 'react';
import {StyleSheet, View, Modal, ScrollView, ToastAndroid} from 'react-native';
import {Container} from 'native-base';

import {
  Appbar,
  Button,
  Text,
  DataTable,
  Portal,
  Dialog,
  Paragraph,
} from 'react-native-paper';
import moment from 'moment';

import common from '../../../Global/stylesheet';
import useUserCred from '../../../UserCredentials';
import MyContainer from '../../../Component/MyContainer';

const RequestDetailScreen = ({route, navigation}) => {
  const {item} = route.params;
  const {userDetails, userCred, deleteUserCred} = useUserCred();

  const [modalVisible, setModalVisible] = useState(false);

  const goToScanQR = () => {
    setModalVisible(false);
    navigation.navigate('QRScanner', {item: item});
  };

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
    <MyContainer>
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.pop()} />
        <Appbar.Content color="white" title="Your Order" />
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
        {item.stageCompleted === 'payment' ? (
          <>
            <View style={{marginTop: 20}}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                Payment Details
              </Text>
              <DataTable>
                <DataTable.Row style ={{paddingVertical : 10}}>
                  <View style={{flex: 1,alignSelf : 'center'}}>
                    <Text>Payment ID</Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text>{item.payment.id}</Text>
                  </View>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>Mode</DataTable.Cell>
                  <DataTable.Cell>{item.payment.mode}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>Payment time</DataTable.Cell>
                  <DataTable.Cell>
                    {moment(new Date(item.payment.time)).format('lll')}
                  </DataTable.Cell>
                </DataTable.Row>
              </DataTable>
            </View>
            <View style={{marginTop: 20}}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                Amount paid : {'₹ '}
                {item.request.payment_amount}
              </Text>
            </View>
            <View style={{alignSelf: 'center', padding: 20}}>
              <Button
                uppercase = {false}
                onPress={() => {
                  setModalVisible(true);
                  console.log('pressed');
                }}
                mode="contained">
                <Text>Confirm</Text>
              </Button>
            </View>
          </>
        ) : (
          <View>
            <View style={{marginTop: 20}}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                Amount to be paid : {item.request.payment_amount}
              </Text>
            </View>
            <View style={{alignSelf: 'center', padding: 20}}>
              <Button uppercase = {false} onPress={() => navigation.goBack()} mode="contained">
                <Text>Back</Text>
              </Button>
            </View>
          </View>
        )}
      </ScrollView>
      <View style={Styles.centeredView}>
        <Portal>
          <Dialog visible={modalVisible} dismissable={false}>
            <Dialog.Title>Confirm Alert</Dialog.Title>
            <Dialog.Content>
              <Paragraph>
                {item.stageCompleted === 'payment' &&
                item.payment.mode === 'cash'
                  ? "The requester opted for cash payment. Make sure you've received the cash before confirming"
                  : 'Do you really want to confirm'}
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button uppercase = {false} onPress={() => setModalVisible(false)}>Cancel</Button>
              <Button uppercase = {false} onPress={() => goToScanQR()}>Continue</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </MyContainer>
  );
};

const Styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  rowView: {
    flexDirection: 'row',
    padding: 20,
  },
  dropdownView: {
    flex: 5,
  },
  paymentBtnView: {
    flex: 4,
  },
  btnView: {
    alignSelf: 'center',
    padding: 10,
  },
});

export default RequestDetailScreen;
