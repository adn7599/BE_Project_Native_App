import React, {useState, useRef} from 'react';
import {View, StyleSheet, Modal, ToastAndroid} from 'react-native';
import {Container} from 'native-base';
import {
  Appbar,
  Button,
  Text,
  TextInput,
  Dialog,
  Paragraph,
  Portal,
  ActivityIndicator,
} from 'react-native-paper';

import useUserCred from '../../UserCredentials';
import * as UserQueries from '../../serverQueries/User/changePassword';
import Loading from '../../Component/Loading';
import MyContainer from '../../Component/MyContainer';

const ChangePasswordScreen = ({navigation}) => {
  const {userCred, deleteUserCred} = useUserCred();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRePassword, setNewRePassword] = useState('');
  const [modalMsg, setModalMsg] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [toggleOldPassVisible, setToggleOldPassvisible] = useState(true);
  const [toggleNewPassVisible, setToggleNewPassvisible] = useState(true);
  const [toggleNewRePassVisible, setToggleNewRePassvisible] = useState(true);

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
    <MyContainer>
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.pop()} />
        <Appbar.Content color="white" title="Change Password" />
      </Appbar.Header>
      <View style={{padding: 20}}>
        <View style={{paddingBottom: 20}}>
          <View>
            <Text style={{fontSize: 17, paddingBottom: 5}}>Old Password</Text>
          </View>
          <View>
            <TextInput
              value={oldPassword}
              placeholder="Old Password"
              mode="flat"
              secureTextEntry={toggleOldPassVisible}
              onChangeText={(Text) => setOldPassword(Text)}
              right={
                <TextInput.Icon
                  name={
                    toggleOldPassVisible ? 'eye-off-outline' : 'eye-outline'
                  }
                  onPress={() => setToggleOldPassvisible(!toggleOldPassVisible)}
                />
              }></TextInput>
          </View>
        </View>
        <View style={{paddingBottom: 20}}>
          <View>
            <Text style={{fontSize: 17, paddingBottom: 5}}>New Password</Text>
          </View>
          <View>
            <TextInput
              value={newPassword}
              placeholder="New Password"
              mode="flat"
              secureTextEntry={toggleNewPassVisible}
              onChangeText={(Text) => setNewPassword(Text)}
              right={
                <TextInput.Icon
                  name={
                    toggleNewPassVisible ? 'eye-off-outline' : 'eye-outline'
                  }
                  onPress={() => setToggleNewPassvisible(!toggleNewPassVisible)}
                />
              }></TextInput>
          </View>
        </View>
        <View style={{paddingBottom: 20}}>
          <View>
            <Text style={{fontSize: 17, paddingBottom: 5}}>
              Re-enter New Password
            </Text>
          </View>
          <View>
            <TextInput
              value={newRePassword}
              placeholder="Re-enter New Password"
              mode="flat"
              secureTextEntry={toggleNewRePassVisible}
              onChangeText={(Text) => setNewRePassword(Text)}
              right={
                <TextInput.Icon
                  name={
                    toggleNewRePassVisible ? 'eye-off-outline' : 'eye-outline'
                  }
                  onPress={() =>
                    setToggleNewRePassvisible(!toggleNewRePassVisible)
                  }
                />
              }></TextInput>
          </View>
        </View>

        <View style={Styles.centeredView}>
          <Button
            style={{}}
            disabled={
              !(
                oldPassword.length > 0 &&
                newPassword.length > 0 &&
                newRePassword.length > 0
              )
            }
            mode="contained"
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
            <Text>Change Password</Text>
          </Button>
        </View>
        <Portal>
          <Dialog visible={modalVisible} dismissable={false}>
            {/* <Dialog.Title></Dialog.Title> */}
            {modalMsg !== null ? (
              <>
                <Dialog.Content style={{}}>
                  <Paragraph style={{fontSize: 16, paddingTop: 25}}>
                    {modalMsg}
                  </Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={() => navigation.popToTop()}>Done</Button>
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
                  Changing password...
                </Text>
              </Dialog.Content>
            )}
          </Dialog>
        </Portal>
      </View>
    </MyContainer>
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
