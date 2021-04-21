import React, {useState} from 'react';
import {StyleSheet, View, Modal, ScrollView} from 'react-native';
import {
  Container,
  Title,
  Left,
  Right,
  Body,
  Header,
  Icon,
  Button,
  Text,
} from 'native-base';
import DropDownPicker from 'react-native-dropdown-picker';
import uuid from 'react-native-uuid';

import common from '../../Global/stylesheet';
import useUserCred from '../../UserCredentials';
import {custReqQueries} from '../../serverQueries/Requester';
import Loading from '../../Component/Loading';

const OrderDetailScreen = ({route, navigation}) => {
  const {item} = route.params;
  const {userDetails, userCred, deleteUserCred} = useUserCred();
  const [PaymentMode, setPaymentMode] = useState(null);
  const [cashModalVisible, setCashModalVisible] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [cashModalMsg, setCashModalMsg] = useState(null);

  const payByCash = async () => {
    setCashModalVisible(true);
    const [respErr, resp] = await custReqQueries.payment(
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
    setCancelModalVisible(false)
    setCashModalVisible(true)
    const [respErr, resp] = await custReqQueries.cancel(
      userCred.ttpToken,
      userCred.relayToken,
      item._id,
    );
    console.log('loaded resp', respErr, resp);
    if (respErr === null) {
      if (resp.status == 200) {
        setCashModalMsg(
          'Your transaction has been cancelled successfully',
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
                  style={[Styles.button, Styles.buttonClose]}
                  onPress={() => navigation.goBack()}>
                  <Text style={Styles.textStyle}>Ok</Text>
                </Button>
              </View>
            </View>
          </View>
        </Modal>
        <Button
          style={[Styles.button, Styles.buttonOpen]}
          disabled={PaymentMode === '' ? true : false}
          onPress={() =>
            PaymentMode === 'cash'
              ? payByCash()
              : navigation.navigate('UPIPayment', {
                  transaction_id: item._id,
                  provider_info: item.request.provider_id,
                  payment_amount: item.request.payment_amount,
                })
          }>
          <Text style={Styles.textStyle}>Proceed To Pay</Text>
        </Button>
      </View>
    );
  };

  const listOrder = item.request.orders.map((ord) => {
    return (
      <Text style={common.text} key={ord.product._id.toString()}>
        {ord.product.name} {ord.quantity} {ord.totalCost}
      </Text>
    );
  });

  console.log(listOrder);

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
            Welcome {userDetails.fName} {userDetails.lName}
          </Text>
        </Body>
        <Right />
      </Header>
      <ScrollView>
        <View style={common.leftTopIndent}>
          <Text style={common.text}>Transaction ID : {item._id}</Text>
        </View>
        <View style={common.leftTopIndent}>
          <Text style={[common.text, {paddingBottom: 10}]}>
            Supplier Details
          </Text>
          <Text style={common.text}>
            Name : {item.request.provider_id.name}
          </Text>
          <Text style={common.text}>
            Address : {item.request.provider_id.address}
          </Text>
          <Text style={common.text}>
            MobNo : {item.request.provider_id.mobNo}
          </Text>
          <Text style={common.text}>
            email : {item.request.provider_id.email}
          </Text>
        </View>
        <View style={common.leftTopIndent}>
          <Text style={common.text}>Items Requested: </Text>
          {listOrder}
        </View>
        <View style={common.leftTopIndent}>
          <Text style={common.text}>
            request date : {new Date(item.request.time).toLocaleDateString()}
          </Text>
          <Text style={common.text}>
            request time : {new Date(item.request.time).toLocaleTimeString()}
          </Text>
        </View>
        <View style={common.leftTopIndent}>
          <Text style={common.text}>
            Ammount to be paid : {item.request.payment_amount}
          </Text>
        </View>
        <View style={Styles.rowView}>
          <View style={Styles.dropdownView}>
            <DropDownPicker
              items={[
                {label: 'Cash', value: 'cash'},
                {label: 'UPI Pay', value: 'upi'},
              ]}
              defaultValue={PaymentMode}
              placeholder="Payment Mode"
              containerStyle={{height: 45, width: 180}}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownStyle={{backgroundColor: '#fafafa'}}
              onChangeItem={(item) => setPaymentMode(item.value)}
            />
          </View>
          <View style={Styles.paymentBtnView}>
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
              <Text style={Styles.modalText}>Are you sure you want to cancel the request</Text>
                <View style={{flexDirection : 'row'}}>
                  <View style={Styles.btnView}>
                    <Button
                      style={[Styles.button, Styles.buttonClose]}
                      onPress={() => cancelReq()}>
                      <Text style={Styles.textStyle}>Yes</Text>
                    </Button>
                  </View>
                  <View style={Styles.btnView}>
                    <Button
                      style={[Styles.button, Styles.buttonClose]}
                      onPress={() => setCancelModalVisible(false)}>
                      <Text style={Styles.textStyle}>No</Text>
                    </Button>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
        <View style={{alignSelf: 'center', padding: 20}}>
          <Button onPress={() => setCancelModalVisible(true)}>
            <Text>Cancel Request</Text>
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

export default OrderDetailScreen;
