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
} from 'react-native-paper';

import useUserCred from '../../../UserCredentials';
import * as UserQueries from '../../../serverQueries/User/complaints';
import Loading from '../../../Component/Loading';
import {sub} from 'react-native-reanimated';
import MyContainer from '../../../Component/MyContainer';

const RaiseComplaintScreen = ({route, navigation}) => {
  const {provider_id, transaction_id} = route.params;
  const {userCred, deleteUserCred} = useUserCred();
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [modalMsg, setModalMsg] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const raiseComplaint = async () => {
    setModalVisible(true);
    const [respErr, resp] = await UserQueries.postComplaint(
      userCred.ttpToken,
      provider_id,
      transaction_id,
      subject,
      body,
    );
    console.log('loaded resp', respErr, resp);
    if (respErr === null) {
      if (resp.status == 200) {
        setModalMsg('Complaint raised successfully');
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
        <Appbar.Content color="white" title="Raise Complaint" />
      </Appbar.Header>
      <View style={{padding: 20}}>
        <View style={{paddingBottom: 20}}>
          <View>
            <Text style={{fontSize: 17, paddingBottom: 5}}>Subject</Text>
          </View>
          <View>
            <TextInput
              value={subject}
              mode="outlined"
              onChangeText={(Text) => setSubject(Text)}
            />
          </View>
          <View style={{paddingTop: 20}}>
            <Text style={{fontSize: 17, paddingBottom: 5}}>Body</Text>
          </View>
          <View>
            <TextInput
              value={body}
              mode="outlined"
              multiline={true}
              numberOfLines={15}
              onChangeText={(Text) => setBody(Text)}
            />
          </View>
        </View>

        <View style={Styles.centeredView}>
          <Button
            style={{}}
            disabled={subject.length < 1 || body.length < 1}
            mode="contained"
            onPress={() => {
              raiseComplaint();
            }}>
            <Text>Submit</Text>
          </Button>
        </View>
        <Portal>
          <Dialog visible={modalVisible} dismissable={false}>
            <Dialog.Title>Complaint status</Dialog.Title>
            {modalMsg !== null ? (
              <>
                <Dialog.Content style={{}}>
                  <Paragraph style={{fontSize: 16, paddingTop: 25}}>
                    {modalMsg}
                  </Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={() => navigation.pop()}>Done</Button>
                </Dialog.Actions>
              </>
            ) : (
              <Dialog.Content
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 10,
                }}>
                <Loading />
                <Text style={{marginLeft: 30, fontSize: 15}}>
                  Raising complaint...
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
});

export default RaiseComplaintScreen;
