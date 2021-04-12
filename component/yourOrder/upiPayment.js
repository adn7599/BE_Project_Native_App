import React,{useState} from 'react';
import {View,TextInput} from 'react-native';
import { Container,Text,Button} from 'native-base';
import RNUpiPayment from 'react-native-upi-payment';
//import { Button } from 'react-native-paper';


const UPIPaymentScreen = ({navigation}) => {

    const [UPI_ID,setUPI_ID] = useState("8828606883@paytm");
    var [Amount,setAmount] = useState("1");
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
    <Container style={{backgroundColor:'#F9D1A3'}}>
        <View style={{flexDirection:'row',alignItems :'center',justifyContent:'center',paddingTop:20}}>
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
                style={{borderWidth:1,width:300,height:40}}
            />
        </View>
        </View>
        <View style={{flexDirection:'row',alignItems :'center',padding:20}}>
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
                style={{borderBottomWidth:1,width:100,height:40}}
            />
        </View>
        </View>
        <View style={{alignSelf:'center'}}>
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

export default UPIPaymentScreen;