import React, {useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Container} from 'native-base';
import {
  Appbar,
  Button,
  Text,
  DataTable,
  Dialog,
  Portal,
  Paragraph,
  ActivityIndicator,
} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import uuid from 'react-native-uuid';
import moment from 'moment';

import useUserCred from '../../../../UserCredentials';
import {
  custReqQueries,
  suppReqQueries,
} from '../../../../serverQueries/Requester';

import colours from '../../../../colours';
import MyContainer from '../../../../Component/MyContainer';

const PaymentOrderDetailScreen = ({route, navigation}) => {
  const {item} = route.params;
  const {userDetails, userCred, deleteUserCred} = useUserCred();
  const [PaymentMode, setPaymentMode] = useState(null);
  const [cashModalVisible, setCashModalVisible] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [cashModalMsg, setCashModalMsg] = useState(null);

  const selectedQueries =
    userCred.role === 'customer' ? custReqQueries : suppReqQueries;

  const payByCash = async () => {
    setCashModalVisible(true);
    const [respErr, resp] = await selectedQueries.payment(
      userCred.ttpToken,
      userCred.relayToken,
      item._id,
      uuid.v4(),
      'cash',
      item.request.payment_amount,
    );
    console.log('loaded resp', respErr, resp);
    if (respErr === null) {
      if (resp.status == 200) {
        setCashModalMsg(
          `Please pay ${item.request.payment_amount} to Supplier`,
        );
      } else if (resp.status == 403) {
        ToastAndroid.show('Token expired\nLogin again', ToastAndroid.LONG);
        await deleteUserCred();
      } else {
        setCashModalMsg(resp.data.error);
      }
    } else {
      setCashModalMsg(respErr.message);
    }
  };

  const cancelReq = async () => {
    setCancelModalVisible(false);
    setCashModalVisible(true);
    const [respErr, resp] = await selectedQueries.cancel(
      userCred.ttpToken,
      userCred.relayToken,
      item._id,
    );
    console.log('loaded resp', respErr, resp);
    if (respErr === null) {
      if (resp.status == 200) {
        setCashModalMsg('Your transaction has been cancelled successfully');
      } else if (resp.status == 403) {
        ToastAndroid.show('Token expired\nLogin again', ToastAndroid.LONG);
        await deleteUserCred();
      } else {
        setCashModalMsg(resp.data.error);
      }
    } else {
      setCashModalMsg(respErr.message);
    }
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

  console.log(listOrder);

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
        <View style={{marginTop: 20, flexDirection: 'row'}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Request Time :</Text>
          <Text style={{fontSize: 18}}>
            {' '}
            {moment(new Date(item.request.time)).format('lll')}
          </Text>
        </View>
        <View style={{marginTop: 20}}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>
            Amount to be paid : {'₹ '}
            {item.request.payment_amount}
          </Text>
        </View>
        <Portal>
          <Dialog visible={cashModalVisible} dismissable={false}>
            <Dialog.Title>
              {PaymentMode === 'cash'
                ? 'Payment Status'
                : 'Cancellation Status'}
            </Dialog.Title>
            {cashModalMsg !== null ? (
              <>
                <Dialog.Content>
                  <Paragraph>{cashModalMsg}</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button
                    uppercase={false}
                    onPress={() => navigation.popToTop()}>
                    Okay
                  </Button>
                </Dialog.Actions>
              </>
            ) : (
              <Dialog.Content
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 10,
                }}>
                <ActivityIndicator size={'large'} animating={true} />
                <Text style={{marginLeft: 30, fontSize: 15}}>
                  {PaymentMode === 'cash'
                    ? 'Processing transaction...'
                    : 'Cancelling transaction...'}
                </Text>
              </Dialog.Content>
            )}
          </Dialog>
        </Portal>
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <DropDownPicker
            items={[
              {label: 'Cash', value: 'cash'},
              {label: 'UPI Pay', value: 'upi'},
            ]}
            defaultValue={PaymentMode}
            placeholder="Payment Mode"
            containerStyle={{height: 45, width: 160}}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            dropDownStyle={{backgroundColor: '#fafafa'}}
            onChangeItem={(item) => setPaymentMode(item.value)}
          />
          <Button
            uppercase={false}
            labelStyle={{color: 'white'}}
            style={{borderRadius: 5, height: 45, justifyContent: 'center'}}
            mode="contained"
            disabled={PaymentMode === null}
            onPress={() =>
              PaymentMode === 'cash'
                ? payByCash()
                : navigation.navigate('UPIPayment', {
                    transaction_id: item._id,
                    provider_info: item.request.provider_id,
                    payment_amount: item.request.payment_amount,
                  })
            }>
            Proceed To Pay
          </Button>
        </View>
        <View style={Styles.centeredView}>
          <Portal>
            <Dialog visible={cancelModalVisible} dismissable={false}>
              <Dialog.Title>Cancel</Dialog.Title>
              <Dialog.Content>
                <Paragraph>
                  Are you sure you want to cancel the request
                </Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button
                  uppercase={false}
                  style={{borderRadius: 5}}
                  onPress={() => setCancelModalVisible(false)}>
                  Disagree
                </Button>
                <Button
                  uppercase={false}
                  style={{borderRadius: 5}}
                  onPress={() => cancelReq()}>
                  Agree
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
        <View
          style={{
            alignSelf: 'center',
            marginTop: 20,
            marginBottom: 30,
            zIndex: 2,
          }}>
          <Button
            labelStyle={{color: 'white'}}
            uppercase={false}
            onPress={() => setCancelModalVisible(true)}
            mode="contained"
            style={{borderRadius: 5, height: 45, justifyContent: 'center'}}>
            Cancel Request
          </Button>
        </View>
      </ScrollView>
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
    borderColor: 'black',
    borderWidth: 1,
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

export default PaymentOrderDetailScreen;
