import React,{useState} from 'react';
import {View,TextInput} from 'react-native';
import { Container,Text,Button} from 'native-base';
//import { Button } from 'react-native-paper';


const UPIPaymentScreen = () => {

    const [UPI_ID,setUPI_ID] = useState("");
    var [Amount,setAmount] = useState("");


    

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
                >
                <Text>
                    Make Payment
                </Text>
            </Button>
        </View>
    </Container>
    );
}

export default UPIPaymentScreen;