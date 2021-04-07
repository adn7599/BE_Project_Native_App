import React,{useState} from 'react';
import {View } from 'react-native';
import { 
    Container,Title,Left,
    Right,Body,Header,
    Icon, Button, Text}
    from 'native-base';
import DropDownPicker from 'react-native-dropdown-picker';

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
    var [PaymentMode,setPaymentMode] = useState("");

    const IsPayed = () =>{
        if (item.status === "Request")
        {
            return(
                <>
                <View style={{padding:20}}>
                    <Text style={{fontSize:20}}>
                        Ammount to be paid : {item.amount}
                    </Text>
                </View>
                <View style={{flexDirection:'row',padding:20}}>
                    <View style={{flex: 5}}>
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
                <View style={{flex:4,}}>
                    <Button 
                        disabled = {PaymentMode === "" ? true : false}
                        onPress = {() => navigation.navigate('UPIPayment')}>
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
                <View style={{padding:20}}>
                    <Text style={{fontSize:20}}>
                        Ammount paid : {item.amount}
                    </Text>
                </View>
                <View style={{alignSelf:'center',paddingTop:10}}>
                    <Button>
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
        <Container style={{backgroundColor:'#F9D1A3'}}>
        <Header style ={{backgroundColor:'white'}}>
              <Left>
                  <Icon onPress= {() => navigation.openDrawer()}
                    name= "md-menu"
                    style={{fontSize: 35, color: 'red'}} />
              </Left>
              <Body>
                  <Title style={{color:'black',paddingLeft:50}}>
                      Your Order
                  </Title>
              </Body>
          </Header>
        <Header style={{backgroundColor:'#E4B884'}}>
            <Body>
            <Text style={{fontSize:20,paddingLeft:20}}>Welcome User</Text>
            </Body>
            <Right />
        </Header>
        <View style ={{paddingBottom:10}}></View>
        <View style={{padding:20}}>
            <Text style={{fontSize:20}}>
                Supplier Name : {item.name}
            </Text>
        </View>
        <View style={{padding:20}}>
            <Text style={{fontSize:20}}>
                Supplier Address : {item.address}
            </Text>
        </View>
        <View style={{padding:20}}>
            <Text style={{fontSize:20}}>
                Items : {item.items}
            </Text>
        </View>
        <IsPayed />
      </Container>
    );
}

export default OrderDetailScreen;