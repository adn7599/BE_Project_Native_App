import React  from 'react';
import { 
    Container,Card,Title,
    CardItem,Left,Right,
    Body,Content, Header,
    Icon,Button,Text,
    Tabs,Tab,}
    from 'native-base';
import { FlatList, View,TouchableOpacity,StyleSheet } from 'react-native';

import common from '../../Global/stylesheet';

const DATA = [
    {
        id : 123456789,
        name: "XYZ",
        items:"Item1, Item2, Item3",
        amount: '200',
        status: "Request",
    },
    {
        id : 123456788,
        name: "XYZ",
        items:"Item1, Item2, Item3",
        amount: '200',
        status: "Payment",
    },
    {
        id : 123456787,
        name: "XYZ",
        items:"Item1, Item2, Item3",
        amount: '200',
        status: "Request",
    },
    {
        id : 123456786,
        name: "XYZ",
        items:"Item1, Item2, Item3",
        amount: '200',
        status: "Request",
    },
    {
        id : 123456785,
        name: "XYZ",
        items:"Item1, Item2, Item3",
        amount: '200',
        status: "Payment",
    },
];



const PaymentOrderScreen = ({navigation}) =>{

  const renderItem = ({ item }) => (
      
    <TouchableOpacity onPress={() => navigation.navigate('OrderDetails')}>
    <Content style={common.cardContainer}>
      <Card style={common.card}>
        <CardItem>
          <Body>
            <Text>
                {item.name}
            </Text>
            <Text>
                {item.items}
            </Text>
            <Text>
                Payable Amount : {item.amount} 
            </Text>
            <Text>
                Status : Payment action needed
            </Text>
          </Body>
        </CardItem>
      </Card>
    </Content> 
    </TouchableOpacity>
  );

    return (
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
        <FlatList
        data={DATA}
        initialNumToRender= {7}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <View style={{
        flexDirection :'row',
         height : 60,
          backgroundColor : 'white',
           }}>
        <View style ={{flex : 1,}}>
          <Button transparent style = {{
            height : 60,
            width:190,
            justifyContent : 'center',
            backgroundColor : '#dcdcdc',
            borderTopColor : 'blue',
            borderTopWidth : 5}}>
          <Text>
            Payment
          </Text>
          </Button>
        </View>
        <View style ={{flex : 1}}>
          <Button transparent 
          style = {{height : 60,width:190,justifyContent :'center'}}
          onPress = {() => navigation.navigate('ConfirmOrder')}>
          <Text style = {{color:'#c0c0c0'}}>
            Confirm
          </Text>
          </Button>
        </View>
      </View>
      </Container>
    );
}

export default PaymentOrderScreen;