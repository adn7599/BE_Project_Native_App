import React,{useState} from 'react';
import {View,TextInput,StyleSheet} from 'react-native';
import { Container,Text,Button} from 'native-base';
import RNUpiPayment from 'react-native-upi-payment';

import common from '../../Global/stylesheet';
import stylesheet from '../../Global/stylesheet';

const UPIPaymentScreen = ({navigation}) => {

    const [UPI_ID,setUPI_ID] = useState("8828606883@paytm");
    const [Amount,setAmount] = useState("1");
    const [Status,setStatus] = useState("");
    const [txnId,settxnId] = useState("");

    const makeUPIPayment = () =>{
        RNUpiPayment.initializePayment({
            vpa: {UPI_ID}, // or can be john@ybl or mobileNo@upi
            payeeName: 'Ajay Pandit',
            amount: {Amount},
            transactionRef: 'some-random-id'
        },successCallback,failureCallback);
    }
    function failureCallback(data){
        console.log("failuer")
        /*
        if(data['Status']=="SUCCESS"){
            setStatus({Status:"SUCCESS"});
            settxnId({txnId:data['txnId']});}
        else
            setStatus({Status:"FAILURE"})*/
    }
    function successCallback(data){
        console.log("success")
        //nothing happened here using Google Pay
    }


    return(
    <Container style={common.container}>
        <View style={Styles.upiRowView}>
        <View>
            <Text>
                UPI ID : 
            </Text>
        </View>
        <View>
            <TextInput 
                value = {UPI_ID}
                placeholder = 'Enter Your UPI ID'
                onChangeText = {Text => setUPI_ID(Text)}
                style={Styles.upiTextField}
            />
        </View>
        </View>
        <View style={Styles.amountRowView}>
        <View>
            <Text>
                Amount : 
            </Text>
        </View>
        <View>
            <TextInput 
                value = {Amount.toString()}
                placeholder = 'Enter Amount'
                onChangeText = {Text => setAmount(Text)}
                style={Styles.amountTextField}
            />
        </View>
        </View>
        <View style={Styles.paymentBtnView}>
            <Button 
                disabled ={(UPI_ID === "" ? true : false) || (Amount === "" ? true : false)}
                onPress = {() => makeUPIPayment()}>
                <Text>
                    Make Payment
                </Text>
            </Button>
        </View>
        <View>
        <Text>{Status+" "+txnId}</Text>
        </View>
    </Container>
    );
}

const Styles = StyleSheet.create({
    upiRowView : {
        flexDirection:'row',
        alignItems :'center',
        justifyContent:'center',
        paddingTop:20,
    },
    upiTextField : {
        borderWidth:1,
        width:300,
        height:40,
    },
    amountRowView : {
        flexDirection:'row',
        alignItems :'center',
        padding:20,
    },
    amountTextField : {
        borderBottomWidth:1,
        width:100,
        height:40,
    },
    paymentBtnView : {
        alignSelf:'center',
    },
})

export default UPIPaymentScreen;