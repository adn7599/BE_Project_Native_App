import React, {useState} from 'react';
import {StyleSheet, View, Modal, ScrollView} from 'react-native';
import {Container} from 'native-base';
import {Appbar, Button, Text, DataTable} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import uuid from 'react-native-uuid';
import moment from 'moment';
import {Table, Col, Cols, TableWrapper} from 'react-native-table-component';

import common from '../../../../Global/stylesheet';
import useUserCred from '../../../../UserCredentials';
import {
  custReqQueries,
  suppReqQueries,
} from '../../../../serverQueries/Requester';
import Loading from '../../../../Component/Loading';
import colours from '../../../../colours';

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

  const PaymentBtn = () => {
    return (
      <View style={Styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={cashModalVisible}
          onRequestClose={() => navigation.goBack()}>
          <View style={Styles.centeredView}>
            <View style={Styles.modalView}>
              {cashModalMsg !== null ? (
                <Text style={Styles.modalText}>{cashModalMsg}</Text>
              ) : (
                <Loading />
              )}
              <View style={Styles.btnView}>
                <Button
                  style={{borderRadius: 5}}
                  onPress={() => navigation.goBack()}
                  mode="contained">
                  Ok
                </Button>
              </View>
            </View>
          </View>
        </Modal>
        <Button
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
    );
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
  const requestTime = new Date(new Date(item.request.time).toLocaleString())
  console.log('date ',requestTime.getHours());

  return (
    <Container>
      <Appbar.Header>
        <Appbar.Action
          size={33}
          icon="menu"
          onPress={() => navigation.openDrawer()}
        />
        <Appbar.Content title="Your Order" />
      </Appbar.Header>
      <ScrollView style={{marginHorizontal: 20}}>
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
            Items Requested{' '}
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
        <View style={{marginTop: 20}}>
          <Text style={common.text}>
            Request Time : {moment(new Date(item.request.time).toLocaleString()).format('lll')}
          </Text>
          <Text></Text>
        </View>
        <View style={{marginTop: 20}}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>
            Amount to be paid : {'₹ '}
            {item.request.payment_amount}
          </Text>
        </View>
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style ={{}}>
            <DropDownPicker
              items={[
                {label: 'Cash', value: 'cash'},
                {label: 'UPI Pay', value: 'upi'},
              ]}
              defaultValue={PaymentMode}
              placeholder="Payment Mode"
              containerStyle={{height: 45, width: 170}}
              itemStyle={{
                justifyContent: 'flex-start',
                
              }}
              dropDownStyle={{backgroundColor: '#fafafa'}}
              onChangeItem={(item) => setPaymentMode(item.value)}
            />
          </View>
          <View>
            <PaymentBtn />
          </View>
        </View>
        <View style={Styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={cancelModalVisible}
            onRequestClose={() => setCancelModalVisible(false)}>
            <View style={Styles.centeredView}>
              <View style={Styles.modalView}>
                <Text style={Styles.modalText}>
                  Are you sure you want to cancel the request
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <View style={Styles.btnView}>
                    <Button
                      style={{borderRadius: 5}}
                      onPress={() => cancelReq()}>
                      Yes
                    </Button>
                  </View>
                  <View style={Styles.btnView}>
                    <Button
                      style={{borderRadius: 5}}
                      onPress={() => setCancelModalVisible(false)}>
                      No
                    </Button>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
        <View style={{alignSelf: 'center', marginTop : 20,marginBottom : 30 , zIndex : 2}}>
          <Button
            onPress={() => setCancelModalVisible(true)}
            mode="contained"
            style={{borderRadius: 5, height: 45, justifyContent: 'center'}}>
            Cancel Request
          </Button>
        </View>
      </ScrollView>
    </Container>
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
