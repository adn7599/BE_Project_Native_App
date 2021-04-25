import React, {useState, useRef} from 'react';
import {View, TextInput, StyleSheet, Modal, ToastAndroid} from 'react-native';
import {Container, Text, Button} from 'native-base';
import uuid from 'react-native-uuid';

import common from '../../../Global/stylesheet';
import useUserCred from '../../../UserCredentials';
import {custReqQueries, suppReqQueries} from '../../../serverQueries/Requester';
import Loading from '../../../Component/Loading';

const Data = [
  {
    name: 'Supplier Name',
    amount: '200',
  },
];

const UPIPaymentScreen = ({route, navigation}) => {
  const {transaction_id, provider_info, payment_amount} = route.params;
  const {userCred, deleteUserCred} = useUserCred();
  const [UPI_ID, setUPI_ID] = useState('');
  const [mPin, setMPin] = useState('');
  const [upiModalMsg, setUPIModalMsg] = useState(null);
  const [ModalVisible, setModalVisible] = useState(false);
  const paymentId = useRef(uuid.v4());

  const selectedQueries =
    userCred.role === 'customer' ? custReqQueries : suppReqQueries;

  const payByUPI = async () => {
    setModalVisible(true);
    const [respErr, resp] = await selectedQueries.payment(
      userCred.ttpToken,
      userCred.relayToken,
      transaction_id,
      paymentId.current,
      'upi',
      payment_amount,
    );
    console.log('loaded resp', respErr, resp);
    if (respErr === null) {
      if (resp.status == 200) {
        setUPIModalMsg(
          `Payment successful \nPayment ID : ${paymentId.current}`,
        );
      } else if (resp.status == 403) {
        ToastAndroid.show('Token expired\nLogin again', ToastAndroid.LONG);
        await deleteUserCred();
      } else {
        setUPIModalMsg(resp.data.error);
      }
    } else {
      setUPIModalMsg(respErr.message);
    }
  };
  const providerType =
    userCred.role === 'customer' ? 'Supplier' : 'Distributor';
  return (
    <Container style={[common.container, Styles.upiContainerView]}>
      <View style={Styles.itemView}>
        <View>
          <Text>
            {providerType} ID : {provider_info._id}
          </Text>
        </View>
      </View>
      <View style={Styles.itemView}>
        <View>
          <Text>
            {providerType} Name : {provider_info.name}
          </Text>
        </View>
      </View>
      <View style={Styles.itemView}>
        <View>
          <Text>Amount to be Paid : {payment_amount}</Text>
        </View>
      </View>
      <View style={Styles.upiRowView}>
        <View>
          <Text>UPI ID :</Text>
        </View>
        <View>
          <TextInput
            value={UPI_ID}
            placeholder="Enter Your UPI ID"
            onChangeText={(Text) => setUPI_ID(Text)}
            style={Styles.upiTextField}
          />
        </View>
      </View>
      <View style={Styles.upiRowView}>
        <View>
          <Text>MPIN :</Text>
        </View>
        <View>
          <TextInput
            value={mPin}
            placeholder="Enter Your UPI ID"
            keyboardType="numeric"
            onChangeText={(Text) => setMPin(Text)}
            style={Styles.upiTextField}
          />
        </View>
      </View>
      <View style={common.topBottomSep}>
        <View style={Styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={ModalVisible}
            onRequestClose={() => navigation.popToTop()}>
            <View style={Styles.centeredView}>
              <View style={Styles.modalView}>
                {upiModalMsg !== null ? (
                  <Text style={Styles.modalText}>{upiModalMsg}</Text>
                ) : (
                  <Loading />
                )}
                <View style={Styles.btnView}>
                  <Button
                    style={[Styles.button, Styles.buttonClose]}
                    onPress={() => navigation.popToTop()}>
                    <Text style={Styles.textStyle}>Ok</Text>
                  </Button>
                </View>
              </View>
            </View>
          </Modal>
          <Button
            style={[Styles.button, Styles.buttonOpen]}
            disabled={UPI_ID.length < 4 && mPin.length < 4}
            onPress={() => payByUPI()}>
            <Text style={Styles.textStyle}>Make Payment</Text>
          </Button>
        </View>
      </View>
    </Container>
  );
};

const Styles = StyleSheet.create({
  centeredView: {
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
  itemView: {
    alignSelf: 'flex-start',
    paddingBottom: 10,
  },
  upiRowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  upiTextField: {
    borderBottomWidth: 1,
    width: 260,
    height: 40,
  },
  amountRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  amountTextField: {
    borderBottomWidth: 1,
    width: 100,
    height: 40,
  },
  paymentBtnView: {
    alignSelf: 'center',
  },
  upiContainerView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 40,
  },
});

export default UPIPaymentScreen;
