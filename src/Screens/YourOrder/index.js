import React  from 'react';
import { 
    Container,Card,Title,
    CardItem,Left,Right,
    Body,Content, Header,
    Icon,Button,Text}
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



const OrderScreen = ({navigation}) =>{

    const IsPayed = (item) => {
        const itemStatus = item.status
        if(( itemStatus) === "Request"){
            return(
                <Text>
                    Status : Payment action needed
                </Text>
            );
        }
        else{
            return(
                <Text>
                    Status : Payment Completed
                </Text>
            );
        }
    }

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
            <IsPayed {...item}/>
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
      </Container>
    );
}

export default OrderScreen;