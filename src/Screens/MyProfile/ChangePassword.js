import React, {useState, useRef} from 'react';
import {View, TextInput, StyleSheet, Modal, ToastAndroid} from 'react-native';
import {Container, Text, Button} from 'native-base';

import common from '../../Global/stylesheet';
import useUserCred from '../../UserCredentials';
import * as UserQueries from '../../serverQueries/User/changePassword';
import Loading from '../../Component/Loading';

const ChangePasswordScreen = ({navigation}) => {
  const {userCred, deleteUserCred} = useUserCred();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRePassword, setNewRePassword] = useState('');
  const [modalMsg, setModalMsg] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const changePassword = async () => {
    setModalVisible(true);
    const [respErr, resp] = await UserQueries.changePassword(
      userCred.ttpToken,
      oldPassword,
      newPassword,
    );
    console.log('loaded resp', respErr, resp);
    if (respErr === null) {
      if (resp.status == 200) {
        setModalMsg('Changed Password Successfully');
        setOldPassword('');
        setNewPassword('');
        setNewRePassword('');
      } else if (resp.status == 403) {
        ToastAndroid.show('Token expired\nLogin again', ToastAndroid.LONG);
        await deleteUserCred();
      } else {
        setModalMsg(resp.data.error);
      }
    } else {
      setModalMsg(respErr.message);
    }
  };

  return (
    <Container style={[common.container, Styles.upiContainerView]}>
      <View style={Styles.itemView}>
        <View>
          <Text>Old Password</Text>
        </View>
        <View>
          <TextInput
            value={oldPassword}
            placeholder="Enter your old password"
            onChangeText={(Text) => setOldPassword(Text)}
            style={Styles.passwordTextField}
          />
        </View>
      </View>
      <View style={Styles.itemView}>
        <View>
          <Text>New Password</Text>
        </View>
        <View>
          <TextInput
            value={newPassword}
            placeholder="Enter your new password"
            onChangeText={(Text) => setNewPassword(Text)}
            style={Styles.passwordTextField}
          />
        </View>
      </View>
      <View style={Styles.itemView}>
        <View>
          <Text>Re-enter New Password</Text>
        </View>
        <View>
          <TextInput
            value={newRePassword}
            placeholder="Re-enter your new password"
            onChangeText={(Text) => setNewRePassword(Text)}
            style={Styles.passwordTextField}
          />
        </View>
      </View>

      <View style={Styles.centeredView}>
        <Button
          style={[Styles.button, Styles.buttonOpen]}
          disabled={
            !(
              oldPassword.length > 0 &&
              newPassword.length > 0 &&
              newRePassword.length > 0
            )
          }
          onPress={() => {
            if (newPassword !== newRePassword) {
              ToastAndroid.show(
                'New passwords do not match',
                ToastAndroid.SHORT,
              );
              return;
            }
            changePassword();
          }}>
          <Text style={Styles.textStyle}>Change Password</Text>
        </Button>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={Styles.centeredView}>
          <View style={Styles.modalView}>
            {modalMsg !== null ? (
              <Text style={Styles.modalText}>{modalMsg}</Text>
            ) : (
              <Loading />
            )}
            <View style={Styles.btnView}>
              <Button
                style={[Styles.button, Styles.buttonClose]}
                onPress={() => setModalVisible(false)}>
                <Text style={Styles.textStyle}>Ok</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
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
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
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
  passwordTextField: {
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

export default ChangePasswordScreen;
