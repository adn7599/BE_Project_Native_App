import React, { useContext } from 'react';
import { Container,Card,Title,CardItem,Left,Right,Thumbnail,Body,Content, Header, Item, Input, Icon, Button, Text} from 'native-base';
import { Dimensions,FlatList, View } from 'react-native';

import Context from '../../global/context';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Wheat',
    discription: 'Wheat is a grass widely cultivated for its seed, a cereal grain which is a worldwide staple food. The many species of wheat together make up the genus Triticum; the most widely grown is common wheat.',
    price: '11',
    unit: 'Kg',
    image: '../../assect/image/wheat.png',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Wheat',
    discription: 'Wheat is a grass widely cultivated for its seed, a cereal grain which is a worldwide staple food. The many species of wheat together make up the genus Triticum; the most widely grown is common wheat.',
    price: '11',
    unit: 'Kg',
    image: '../../assect/image/wheat.png',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Wheat',
    discription: 'Wheat is a grass widely cultivated for its seed, a cereal grain which is a worldwide staple food. The many species of wheat together make up the genus Triticum; the most widely grown is common wheat.',
    price: '11',
    unit: 'Kg',
    image: '../../assect/image/wheat.png',
  },
];

const dimension = Dimensions.get('screen');


const HomeScreen = ({navigation}) =>{

  const {TotalAmount,changeTotal} = useContext(Context);

  
  //changeTotal(-(TotalAmount));

  const renderItem = ({ item }) => (
    <Content style={{ paddingHorizontal: 20 }}>
      <Card style={{ flex: 0 }}>
        <CardItem>
          <Body>
            <Thumbnail source={require('../../assect/image/wheat.png')} style={{ height: 200, width: dimension.width - 80, flex: 1 }} />
            <CardItem>
              <Left>
                <Body>
                  <Text>{item.title}</Text>
                  <Text note>{item.price} Rs/{item.unit}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  {item.discription}
                </Text>
              </Body>
            </CardItem>
            <Button 
              textStyle={{ color: '#87838B' }} 
              style={{ alignSelf: 'flex-end' }}
              onPress={() => navigation.openDrawer()}
              >
              <Icon name="cart" />
              <Text>Add To Cart</Text>
            </Button>
          </Body>
        </CardItem>
      </Card>
    </Content> 
  );


    return (
      <Container style={{backgroundColor:'#F9D1A3'}}>
        <Header searchBar rounded style={{backgroundColor:''}}>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <Header style={{backgroundColor:'#E4B884'}}>
            <Body>
            <Text style={{fontSize:20,paddingLeft:20}}>Welcome User</Text>
            </Body>
            <Right />
        </Header>
        <FlatList
        data={DATA}
        initialNumToRender= {4}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      </Container>
    );
}

export default HomeScreen;