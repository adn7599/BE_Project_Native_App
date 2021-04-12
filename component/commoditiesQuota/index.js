import React, { useContext } from 'react';
import { Container,Card,Title,CardItem,Left,Right,Thumbnail,Body,Content, Header, Item, Input, Icon, Button, Text} from 'native-base';
import { Dimensions,FlatList, View } from 'react-native';


const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Wheat',
    discription: 'Wheat is a grass widely cultivated for its seed, a cereal grain which is a worldwide staple food. The many species of wheat together make up the genus Triticum; the most widely grown is common wheat.',
    price: '11',
    unit: 'Kg',
    image: '../../assect/image/wheat.png',
    allotted_quota: 10,
    remaining_quota: 5,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Wheat',
    discription: 'Wheat is a grass widely cultivated for its seed, a cereal grain which is a worldwide staple food. The many species of wheat together make up the genus Triticum; the most widely grown is common wheat.',
    price: '11',
    unit: 'Kg',
    image: '../../assect/image/wheat.png',
    allotted_quota: 10,
    remaining_quota: 5,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Wheat',
    discription: 'Wheat is a grass widely cultivated for its seed, a cereal grain which is a worldwide staple food. The many species of wheat together make up the genus Triticum; the most widely grown is common wheat.',
    price: '11',
    unit: 'Kg',
    image: '../../assect/image/wheat.png',
    allotted_quota: 10,
    remaining_quota: 5,
  },
];

const dimension = Dimensions.get('screen');


const QuotaScreen = ({navigation}) =>{

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
            <CardItem>
                <Body>
                    <Text>
                        Allotted Quota : {item.allotted_quota}
                    </Text>
                    <Text>
                        Remaining Quota : {item.remaining_quota}
                    </Text>
                </Body>
            </CardItem>
          </Body>
        </CardItem>
      </Card>
    </Content> 
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
                  <Title style={{color:'black',paddingLeft:100}}>
                      Quota
                  </Title>
              </Body>
              <Right />
          </Header>
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
        <View style={{paddingTop:10}}></View>
        <FlatList
        data={DATA}
        initialNumToRender= {4}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      </Container>
    );
}

export default QuotaScreen;