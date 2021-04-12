import React,{useState} from 'react';
import {View,ActivityIndicator,Modal,StyleSheet,Alert,Pressable} from 'react-native';
import { Button, Container,Text, Title } from 'native-base';



const CashPaymentScreen = ({navigation}) =>{

    const [modalSuccess, setmodalSuccess] = useState(false);
    const [modalUnsuccess, setmodalUnsuccess] = useState(false);

    const UnSuccessModel = () => {
      return (
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalUnsuccess}
            onRequestClose={() => navigation.goBack()}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Payment Unseccessfull</Text>
                <Button
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => navigation.goBack()}
                >
                  <Text style={styles.textStyle}>Hide Modal</Text>
                </Button>
              </View>
            </View>
          </Modal>
          <Button
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setmodalUnsuccess(true)}
          >
            <Text style={styles.textStyle}>Unsuccess Modal</Text>
          </Button>
        </View>
      );
    }

    const SuccessModel = () =>{
      return (
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalSuccess}
            onRequestClose={() => navigation.goBack()}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Payment Successfull</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => navigation.goBack()}
                >
                  <Text style={styles.textStyle}>Hide Modal</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <Button
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setmodalSuccess(true)}
          >
            <Text style={styles.textStyle}>Success Modal</Text>
          </Button>
        </View>
      );
    }
    return(
    <Container style={{backgroundColor:'#F9D1A3'}}>
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <View>
            <Text>
                Waiting for confirmation
            </Text>
        </View>
        <View style={{paddingTop:10}}>
            <ActivityIndicator size = "large" color='red'/>
        </View>
        <View style={{flexDirection:'row',paddingTop:20}}>
            <View style ={{padding:10}}>
            <SuccessModel />
            </View>
            <View style={{padding:10}}>
            <UnSuccessModel />
            </View>
        </View>
        </View>
    </Container>
    );
}

const styles = StyleSheet.create({
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
    }
  });

export default CashPaymentScreen;