import React,{useState} from 'react';
import {View,ActivityIndicator,Modal,StyleSheet,Alert,Pressable} from 'react-native';
import { Button, Container,Text, Title } from 'native-base';

import common from '../../Global/stylesheet';

const CashPaymentScreen = ({navigation}) =>{

    const [modalSuccess, setmodalSuccess] = useState(false);
    const [modalUnsuccess, setmodalUnsuccess] = useState(false);

    const UnSuccessModel = () => {
      return (
        <View style={Styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalUnsuccess}
            onRequestClose={() => navigation.goBack()}
          >
            <View style={Styles.centeredView}>
              <View style={Styles.modalView}>
                <Text style={Styles.modalText}>Payment Unseccessfull</Text>
                <Button
                  style={[Styles.button, Styles.buttonClose]}
                  onPress={() => navigation.goBack()}
                >
                  <Text style={Styles.textStyle}>Hide Modal</Text>
                </Button>
              </View>
            </View>
          </Modal>
          <Button
            style={[Styles.button, Styles.buttonOpen]}
            onPress={() => setmodalUnsuccess(true)}
          >
            <Text style={Styles.textStyle}>Unsuccess Modal</Text>
          </Button>
        </View>
      );
    }

    const SuccessModel = () =>{
      return (
        <View style={Styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalSuccess}
            onRequestClose={() => navigation.goBack()}
          >
            <View style={Styles.centeredView}>
              <View style={Styles.modalView}>
                <Text style={Styles.modalText}>Payment Successfull</Text>
                <Pressable
                  style={[Styles.button, Styles.buttonClose]}
                  onPress={() => navigation.goBack()}
                >
                  <Text style={Styles.textStyle}>Hide Modal</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <Button
            style={[Styles.button, Styles.buttonOpen]}
            onPress={() => setmodalSuccess(true)}
          >
            <Text style={Styles.textStyle}>Success Modal</Text>
          </Button>
        </View>
      );
    }
    return(
    <Container style={common.container}>
        <View style={Styles.containerView}>
        <View>
            <Text>
                Waiting for confirmation
            </Text>
        </View>
        <View style={common.topBottomSep}>
            <ActivityIndicator size = "large" color='red'/>
        </View>
        <View style={Styles.btnView}>
            <View style ={common.leftTopIndent}>
            <SuccessModel />
            </View>
            <View style={common.leftTopIndent}>
            <UnSuccessModel />
            </View>
        </View>
        </View>
    </Container>
    );
}

const Styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding:10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    containerView : {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    btnView : {
      flexDirection:'row',
      paddingTop:20,
    },
  });

export default CashPaymentScreen;