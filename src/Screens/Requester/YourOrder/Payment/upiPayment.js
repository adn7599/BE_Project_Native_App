import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  ToastAndroid,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {
  Text,
  Button,
  Appbar,
  TextInput,
  Portal,
  Dialog,
  Paragraph,
} from 'react-native-paper';
import uuid from 'react-native-uuid';

import useUserCred from '../../../../UserCredentials';
import {
  custReqQueries,
  suppReqQueries,
} from '../../../../serverQueries/Requester';
import Loading from '../../../../Component/Loading';

const UPIPaymentScreen = ({route, navigation}) => {
  const {transaction_id, provider_info, payment_amount} = route.params;
  const {userCred, deleteUserCred} = useUserCred();
  const [UPI_ID, setUPI_ID] = useState('');
  const [mPin, setMPin] = useState('');
  const [upiModalMsg, setUPIModalMsg] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [togglePassVisible, setTogglePassvisible] = useState(true);
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
    <SafeAreaView>
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.pop()} />
        <Appbar.Content color="white" title="UPI Payment" />
      </Appbar.Header>
      <View style={{margin: 20}}>
        <View style={{marginTop: 20, flexDirection: 'row'}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            {providerType} Name :
          </Text>
          <Text style={{fontSize: 18}}> {provider_info.name}</Text>
        </View>
        <View style={{marginTop: 20, flexDirection: 'row'}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            {providerType} ID :
          </Text>
          <Text style={{fontSize: 18}}> {provider_info._id}</Text>
        </View>
        <View style={{marginTop: 20, flexDirection: 'row'}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Order Total :</Text>
          <Text style={{fontSize: 18}}>
            {' '}
            {'₹ '}
            {payment_amount}
          </Text>
        </View>
        <View style={{marginTop: 40}}>
          <TextInput
            value={UPI_ID}
            onChangeText={(Text) => setUPI_ID(Text)}
            mode="outlined"
            label="UPI ID"
            style={{height: 50}}
          />
        </View>
        <View style={{marginTop: 20}}>
          <TextInput
            value={mPin}
            keyboardType="numeric"
            label="M-Pin"
            mode="outlined"
            maxLength={6}
            secureTextEntry={togglePassVisible}
            onChangeText={(Text) => setMPin(Text)}
            right={
              <TextInput.Icon
                name={togglePassVisible ? 'eye-off-outline' : 'eye-outline'}
                onPress={() => setTogglePassvisible(!togglePassVisible)}
              />
            }></TextInput>
        </View>
        <View style={{marginTop: 20}}>
          <View style={Styles.centeredView}>
            <Portal>
              <Dialog
                visible={modalVisible}
                dismissable={false}
                //onDismiss={() => {}}
              >
                <Dialog.Title>Payment Status</Dialog.Title>
                {upiModalMsg !== null ? (
                  <>
                    <Dialog.Content>
                      <Paragraph>{upiModalMsg}</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                      <Button
                        uppercase={false}
                        onPress={() => navigation.popToTop()}>
                        Done
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
                      Processing transaction...
                    </Text>
                  </Dialog.Content>
                )}
              </Dialog>
            </Portal>
            <Button
              style={{borderRadius: 5, height: 40}}
              labelStyle={{color: 'white'}}
              disabled={UPI_ID.length < 4 || mPin.length < 4}
              mode="contained"
              uppercase={false}
              onPress={() => payByUPI()}>
              Make Payment
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
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
    margin: 40,
    alignItems: 'center',
    flex: 1,
  },
});

export default UPIPaymentScreen;
