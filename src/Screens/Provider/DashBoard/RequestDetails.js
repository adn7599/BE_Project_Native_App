import React, {useState} from 'react';
import {StyleSheet, View, Modal, ScrollView, ToastAndroid} from 'react-native';
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
import {sha256} from 'react-native-sha256';

import common from '../../../Global/stylesheet';
import useUserCred from '../../../UserCredentials';
import {sign} from '../../../serverQueries/User/sign';

const RequestDetailScreen = ({route, navigation}) => {
  const {item} = route.params;
  const {userDetails, userCred, deleteUserCred} = useUserCred();

  const [modalVisible, setModalVisible] = useState(false);

  const goToScanQR = () => {
    navigation.navigate('QRScanner', {item: item});
  };

  const listOrder = item.request.orders.map((ord) => {
    return (
      <Text style={common.text} key={ord.product._id.toString()}>
        {ord.product.name} {ord.quantity} {ord.totalCost}
      </Text>
    );
  });

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
            Welcome {userDetails.name}
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
            {userCred.role === 'SP' ? 'Customer' : 'Supplier'} Details
          </Text>
          <Text style={common.text}>ID : {item.request.requester_id._id}</Text>
          <Text style={common.text}>
            Name :{' '}
            {userCred.role === 'SP'
              ? item.request.requester_id.fName +
                ' ' +
                item.request.requester_id.lName
              : item.request.requester_id.name}
          </Text>
          <Text style={common.text}>
            Address : {item.request.requester_id.address}
          </Text>
          <Text style={common.text}>
            MobNo : {item.request.requester_id.mobNo}
          </Text>
          <Text style={common.text}>
            email : {item.request.requester_id.email}
          </Text>
        </View>
        <View style={common.leftTopIndent}>
          <Text style={common.text}>Items Requested: </Text>
          {listOrder}
        </View>
        <View style={common.leftTopIndent}>
          <Text style={common.text}>
            Request date : {new Date(item.request.time).toLocaleDateString()}
          </Text>
          <Text style={common.text}>
            Request time : {new Date(item.request.time).toLocaleTimeString()}
          </Text>
        </View>
        {item.stageCompleted === 'payment' ? (
          <>
            <View style={common.leftTopIndent}>
              <Text style={common.text}>Payment ID : {item.payment.id}</Text>
            </View>
            <View style={common.leftTopIndent}>
              <Text style={common.text}>Mode : {item.payment.mode}</Text>
              <Text style={common.text}>
                Payment date :{' '}
                {new Date(item.payment.time).toLocaleDateString()}
              </Text>
              <Text style={common.text}>
                Payment time :{' '}
                {new Date(item.payment.time).toLocaleTimeString()}
              </Text>
            </View>
            <View style={common.leftTopIndent}>
              <Text style={common.text}>
                Amount paid : {item.request.payment_amount}
              </Text>
            </View>
            <View style={{alignSelf: 'center', padding: 20}}>
              <Button
                onPress={() => {
                  setModalVisible(true);
                  console.log('pressed');
                }}>
                <Text>Confirm</Text>
              </Button>
            </View>
          </>
        ) : (
          <>
            <View style={common.leftTopIndent}>
              <Text style={common.text}>
                Amount to be paid : {item.request.payment_amount}
              </Text>
            </View>
            <View style={{alignSelf: 'center', padding: 20}}>
              <Button onPress={() => navigation.goBack()}>
                <Text>Back</Text>
              </Button>
            </View>
          </>
        )}
      </ScrollView>
      <View style={Styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={Styles.centeredView}>
            <View style={Styles.modalView}>
              <Text style={Styles.modalText}>
                {item.stageCompleted === 'payment' &&
                item.payment.mode === 'cash'
                  ? "The requester opted for cash payment. Make sure you've received the cash before confirming"
                  : 'Do you really want to confirm'}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <View style={Styles.btnView}>
                  <Button
                    style={[Styles.button, Styles.buttonClose]}
                    onPress={() => goToScanQR()}>
                    <Text style={Styles.textStyle}>Yes</Text>
                  </Button>
                </View>
                <View style={Styles.btnView}>
                  <Button
                    style={[Styles.button, Styles.buttonClose]}
                    onPress={() => setModalVisible(false)}>
                    <Text style={Styles.textStyle}>No</Text>
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
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

export default RequestDetailScreen;
