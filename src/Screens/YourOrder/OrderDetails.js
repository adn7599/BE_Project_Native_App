import React,{useState} from 'react';
import {StyleSheet, View, Modal } from 'react-native';
import { 
    Container,Title,Left,
    Right,Body,Header,
    Icon, Button, Text}
    from 'native-base';
import DropDownPicker from 'react-native-dropdown-picker';

import common from '../../Global/stylesheet';

const Data = [
    {
        id : "123456789",
        name : "XYZ",
        address : "XXXXX",
        items : "Item1, Item2, Item3",
        amount : "200",
        status : "Request"
    },
];

const OrderDetailScreen = ({navigation}) =>{
    const item = Data[0]
    const [PaymentMode,setPaymentMode] = useState("");
    const [ModalVisible,setModalVisible] = useState(false);

    const PaymentBtn = () => {
        return (
            <View style={Styles.centeredView}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={ModalVisible}
                onRequestClose={() => navigation.goBack()}
              >
                <View style={Styles.centeredView}>
                  <View style={Styles.modalView}>
                    <Text style={Styles.modalText}>
                        Please pay {item.amount} to Supplier 
                    </Text>
                    <View style={Styles.btnView}>
                    <Button
                      style={[Styles.button, Styles.buttonClose]}
                      onPress={() => navigation.goBack()}
                    >
                      <Text style={Styles.textStyle}>Ok</Text>
                    </Button>
                    </View>
                  </View>
                </View>
              </Modal>
              <Button
                style={[Styles.button, Styles.buttonOpen]}
                disabled = {PaymentMode === "" ? true : false}
                onPress={() => PaymentMode === "cash" ? 
                setModalVisible(true) :
                navigation.navigate('UPIPayment')}
              >
                <Text style={Styles.textStyle}>Proceed To Pay</Text>
              </Button>
            </View>
          );
    }

    const IsPayed = () =>{
        if (item.status === "Request")
        {
            return(
                <>
                <View style={common.leftTopIndent}>
                    <Text style={common.text}>
                        Ammount to be paid : {item.amount}
                    </Text>
                </View>
                <View style={Styles.rowView}>
                    <View style={Styles.dropdownView}>
                    <DropDownPicker
                        items={[
                            {label:'Cash', value: "cash"},
                            {label:'UPI Pay', value: "upi"},
                        ]}
                        defaultValue={PaymentMode}
                        placeholder = 'Payment Mode'
                        containerStyle={{height: 45,width:180}}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        dropDownStyle={{backgroundColor: '#fafafa'}}
                        onChangeItem={ item => setPaymentMode(item.value)}
                    />
                    </View>
                <View style={Styles.paymentBtnView}>
                    <PaymentBtn />
                </View>
                </View>
                </>
            )
        }
        else
        {
            return(
                <>
                <View style={common.leftTopIndent}>
                    <Text style={common.text}>
                        Ammount paid : {item.amount}
                    </Text>
                </View>
                <View style={Styles.btnView}>
                    <Button onPress = {() => navigation.navigate('ConfirmationQR')}>
                        <Text>
                            Proceed  To Confirmation
                        </Text>
                    </Button>
                </View>
                </>
            )
        }
    }

    return(
        <Container style={common.container}>
        <Header style ={common.headerColor}>
              <Left>
                  <Icon onPress= {() => navigation.openDrawer()}
                    name= "md-menu"
                    style={common.headerMenuBtn} />
              </Left>
              <Body>
                  <Title style={common.headerText}>
                      Your Order
                  </Title>
              </Body>
          </Header>
        <Header style={common.welcomeHeader}>
            <Body>
            <Text style={common.welcomeHeaderText}>Welcome User</Text>
            </Body>
            <Right />
        </Header>
        <View style ={common.topBottomSep}></View>
        <View style={common.leftTopIndent}>
            <Text style={common.text}>
                Supplier Name : {item.name}
            </Text>
        </View>
        <View style={common.leftTopIndent}>
            <Text style={common.text}>
                Supplier Address : {item.address}
            </Text>
        </View>
        <View style={common.leftTopIndent}>
            <Text style={common.text}>
                Items : {item.items}
            </Text>
        </View>
        <IsPayed />
        <View style ={common.rightcornerBtn}> 
          <Button>
            <Text>
              Cancel Request
            </Text>
          </Button>
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
    rowView : {
        flexDirection:'row',
        padding:20,
    },
    dropdownView : {
        flex : 5,
    },
    paymentBtnView : {
        flex : 4,
    },
    btnView : {
        alignSelf:'center',
        paddingTop:10,
    },

})

export default OrderDetailScreen;