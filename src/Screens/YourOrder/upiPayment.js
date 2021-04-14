import React,{useState} from 'react';
import {View,TextInput,StyleSheet} from 'react-native';
import { Container,Text,Button} from 'native-base';
import RNUpiPayment from 'react-native-upi-payment';

import common from '../../Global/stylesheet';

const Data =[
    {
        name : 'Supplier Name',
        amount : '200',

    }
]

const UPIPaymentScreen = ({navigation}) => {

    const [UPI_ID,setUPI_ID] = useState('');
    const [Amount,setAmount] = useState();
    const [Status,setStatus] = useState("");
    const [txnId,settxnId] = useState("");
    const item = Data[0];

    /*const makeUPIPayment = () =>{
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
            setStatus({Status:"FAILURE"})
    }
    function successCallback(data){
        console.log("success")
        //nothing happened here using Google Pay
    }*/


    return(
    <Container style={[common.container,Styles.upiContainerView]}>
        <View style={Styles.itemView}>
        <View>
            <Text>
                Supplier Name : {item.name}
            </Text>
        </View>
        </View>
        <View style={Styles.itemView}>
        <View>
            <Text>
                Amount to be Paid : {item.amount}
            </Text>
        </View>
        </View>
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
        <View style={common.topBottomSep}>
            <Button>
                <Text>
                    Make payment
                </Text>
            </Button>
        </View>
    </Container>
    );
}

const Styles = StyleSheet.create({
    itemView : {
        alignSelf : 'flex-start',
         padding : 20
    },
    upiRowView : {
        flexDirection:'row',
        alignItems : 'center',
        padding:20,
    },
    upiTextField : {
        borderBottomWidth : 1,
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
    upiContainerView : {
        justifyContent : 'center',
        alignItems : 'center',
        flex : 1,
    }
})

export default UPIPaymentScreen;