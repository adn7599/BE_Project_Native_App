import React,{useState} from 'react';
import {StyleSheet, View } from 'react-native';
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
                    <Button 
                        disabled = {PaymentMode === "" ? true : false}
                        onPress = {() => {
                            PaymentMode === "cash" ? 
                            navigation.navigate('CashPayment') : 
                            navigation.navigate('UPIPayment') }}>
                        <Text>
                            Proceed  To Pay
                        </Text>
                    </Button>
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
                <View style={Styles.confirmBtnView}>
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
      </Container>
    );
}

const Styles = StyleSheet.create({
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
    confirmBtnView : {
        alignSelf:'center',
        paddingTop:10,
    },
})

export default OrderDetailScreen;