import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  ToastAndroid,
  Modal,
} from 'react-native';
import {Dialog, Portal, Paragraph, Text, TextInput} from 'react-native-paper';
import {Button} from 'native-base';
import colours from '../../../colours';

import {accountRegister} from '../../../serverQueries/User/register';
import {resetPassword} from '../../../serverQueries/User/forgotPassword';

const SetPassword = ({route, navigation}) => {
  const {role, reg_id, regToken, intent} = route.params;
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [ModalVisible, setModalVisible] = useState(false);
  const [togglePassVisible, setTogglePassvisible] = useState(true);
  const [toggleRePassVisible, setToggleRePassvisible] = useState(true);

  let selectedQuery;
  if (intent === 'forgotPassword') {
    selectedQuery = resetPassword;
  } else {
    selectedQuery = accountRegister;
  }

  const onPressContinue = async () => {
    if (password === rePassword) {
      const [respErr, resp] = await selectedQuery(
        role,
        reg_id,
        password,
        regToken,
      );
      console.log('log resp', respErr, resp);
      if (respErr == null) {
        if (resp.status == 200) {
          setModalVisible(true);
        } else {
          ToastAndroid.show(`${resp.data.error}`, ToastAndroid.SHORT);
        }
      } else {
        ToastAndroid.show(
          `Server Error : ${respErr.message}`,
          ToastAndroid.SHORT,
        );
      }
    } else {
      ToastAndroid.show('Passwords do not match!', ToastAndroid.SHORT);
    }
  };

  return (
    <SafeAreaView style={Styles.container}>
      <Text style={Styles.title}>
        {intent === 'forgotPassword'
          ? 'Reset your password'
          : 'Set your password'}
      </Text>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={Styles.infoText}>
          Password must be at least 8 characters long, must contain at least one
          alphabet [A-Za-z] and one number [0-9]
        </Text>
      </View>
      <View style={Styles.inputFieldsView}>
        <TextInput
          value={password}
          style={Styles.textInput}
          placeholder="Enter password"
          keyboardType="visible-password"
          secureTextEntry={togglePassVisible}
          onChangeText={(text) => setPassword(text)}
          right={
            <TextInput.Icon
              name={togglePassVisible ? 'eye-off-outline' : 'eye-outline'}
              onPress={() => setTogglePassvisible(!togglePassVisible)}
            />
          }
        />
        <TextInput
          value={rePassword}
          style={Styles.textInput}
          placeholder="Re-enter password"
          keyboardType="visible-password"
          secureTextEntry={toggleRePassVisible}
          onChangeText={(text) => setRePassword(text)}
          right={
            <TextInput.Icon
              name={toggleRePassVisible ? 'eye-off-outline' : 'eye-outline'}
              onPress={() => setToggleRePassvisible(!toggleRePassVisible)}
            />
          }
        />
      </View>
      <View style={Styles.centeredView}>
        <Portal>
          <Dialog visible={ModalVisible} dismissable={false}>
            <Dialog.Content>
              <Paragraph>
                {intent === 'forgotPassword'
                  ? 'Password reset successfully'
                  : 'User successfully registered'}
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                uppercase={false}
                style={[Styles.button, Styles.buttonClose]}
                onPress={() => navigation.popToTop()}>
                Okay
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
      <View style={Styles.viewBottom}>
        <TouchableOpacity onPress={onPressContinue}>
          <View style={Styles.btnContinue}>
            <Text style={Styles.btnContinueText}>Continue</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SetPassword;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.light,
    padding: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colours.brown,
    marginTop: 20,
  },
  infoText: {
    fontSize: 16,
    color: colours.orange,
    marginBottom: 30,
    marginTop: 20,
  },
  inputFieldsView: {
    flex: 1,
    justifyContent: 'center',
  },
  textInput: {
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderBottomWidth: 1.5,
    borderBottomColor: colours.green,
    marginHorizontal: 5,
    height: 50,
  },
  viewBottom: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    marginBottom: 0,
  },
  btnContinue: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colours.green,
  },
  btnContinueText: {
    color: '#fff',
    alignItems: 'center',
  },
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
    width: 80,
    justifyContent: 'center',
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
    paddingTop: 10,
  },
});
