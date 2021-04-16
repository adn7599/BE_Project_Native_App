import React,{useState} from 'react';
import {View,ActivityIndicator,Modal,StyleSheet,Alert,Pressable} from 'react-native';
import { Button, Container,Text, Title } from 'native-base';
import QRCode from 'react-native-qrcode-svg';


const qrcode = require('../../Assets/QRcode.png')

const PaymentInfo = "Upi transaction ID\n11052115436\n\nTo: Ajay Pandit\najaypandit@upi\n\nFrom: Ajay\n123456@upi\n\nAmount Paid: 500\n\nApr 16, 12.00 PM"

const ConfirmationQRScreen = ({navigation}) =>{

    
    return(
    <Container style={Styles.container}>
        <View style ={Styles.qrcodeView}>
        <QRCode
            value={PaymentInfo}
            //logo={qrcode}
            //logoSize={100}
            size ={250}
            logoBackgroundColor='transparent'
        />
        </View>
    </Container>
    );
}


const Styles = StyleSheet.create({
    container : {
        backgroundColor:'#F9D1A3',
    },
    qrcodeView : {
        alignItems : 'center',
        justifyContent : 'center',
        flex : 1,
        
    }
})
export default ConfirmationQRScreen;