import React, { useContext } from 'react';
import { 
    Container,Card,Title,
    CardItem,Left,Right,
    Body,Content, Header,
    Icon,Button,Text}
    from 'native-base';
import { FlatList, View,TouchableOpacity } from 'react-native';

import Context from '../../global/context';

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
    <Content style={{ paddingHorizontal: 20 }}>
      <Card style={{ flex: 0 }}>
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