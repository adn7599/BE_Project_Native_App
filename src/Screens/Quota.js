import React from 'react';
import { Container,Card,Title,CardItem,Left,Right,Thumbnail,Body,Content, Header, Item, Input, Icon, Button, Text} from 'native-base';
import { Dimensions,FlatList, View } from 'react-native';

import common from '../Global/stylesheet';

const resp = {
  "_id": "1111111111",
  "commodities": [
      {
          "product": {
              "_id": 1001,
              "name": "Wheat",
              "description": "Wheat Description",
              "unit": "Kg",
              "price": 20
          },
          "allotedQuantity": 20,
          "availableQuantity": 20,
          "addedToCart": true,
          "cartQuantity": 3
      },
      {
          "product": {
              "_id": 1002,
              "name": "Rice",
              "description": "Rice Description",
              "unit": "Kg",
              "price": 30
          },
          "allotedQuantity": 25,
          "availableQuantity": 5,
          "addedToCart": true,
          "cartQuantity": 3
      },
      {
          "product": {
              "_id": 1005,
              "name": "Oil",
              "description": "Oil Description",
              "unit": "ltr",
              "price": 35
          },
          "allotedQuantity": 5,
          "availableQuantity": 0,
          "addedToCart": false
      }
  ]
}

const dimension = Dimensions.get('screen');


const QuotaScreen = ({navigation}) =>{

  const renderItem = ({ item }) => (
    <Content style={common.cardContainer}>
      <Card style={common.card}>
        <CardItem>
          <Body>
            <Thumbnail 
            source={require('../Assets/wheat.png')} 
            style={common.cardThumbnail} />
            <CardItem>
              <Left>
                <Body>
                  <Text>{item.product.name}</Text>
                  <Text note>{item.product.price} Rs/{item.product.unit}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  {item.product.description}
                </Text>
              </Body>
            </CardItem>
            <CardItem>
                <Body>
                    <Text>
                        Allotted Quota : {item.allottedQuantity}
                    </Text>
                    <Text>
                        Remaining Quota : {item.availableQuantity}
                    </Text>
                </Body>
            </CardItem>
          </Body>
        </CardItem>
      </Card>
    </Content> 
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
                      Quota
                  </Title>
              </Body>
          </Header>
        <Header searchBar rounded >
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <Header style={common.welcomeHeader}>
            <Body>
            <Text style={common.welcomeHeaderText}>Welcome User</Text>
            </Body>
            <Right />
        </Header>
        <View style={common.topBottomSep}></View>
        <FlatList
        data={resp.commodities}
        initialNumToRender= {4}
        renderItem={renderItem}
        keyExtractor={item => item.product._id.toString()}
      />
      </Container>
    );
}

export default QuotaScreen;