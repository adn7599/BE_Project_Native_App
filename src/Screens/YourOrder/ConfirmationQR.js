import React,{useState} from 'react';
import {View,ActivityIndicator,Modal,StyleSheet,Alert,Pressable} from 'react-native';
import { Button, Container,Text, Title } from 'native-base';



const ConfirmationQRScreen = ({navigation}) =>{

    
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


export default ConfirmationQRScreen;