import React, { useContext,useState } from 'react';
import { Dimensions,View,FlatList,StyleSheet} from 'react-native';
import { 
    Container,Body,Header,
    Right,Button, Text,}
    from 'native-base';


import common from '../../../Global/stylesheet';
import Context from '../../../Global/context';
import ShowCard from '../../../Component/ShowCard';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Wheat1',
    discription: 'Wheat is a grass widely cultivated for its seed, a cereal grain which is a worldwide staple food. The many species of wheat together make up the genus Triticum; the most widely grown is common wheat.',
    price: '11',
    unit: 'Kg',
    image: '../../assect/image/wheat.png',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Wheat2',
    discription: 'Wheat is a grass widely cultivated for its seed, a cereal grain which is a worldwide staple food. The many species of wheat together make up the genus Triticum; the most widely grown is common wheat.',
    price: '11',
    unit: 'Kg',
    image: '../../assect/image/wheat.png',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Wheat3',
    discription: 'Wheat is a grass widely cultivated for its seed, a cereal grain which is a worldwide staple food. The many species of wheat together make up the genus Triticum; the most widely grown is common wheat.',
    price: '11',
    unit: 'Kg',
    image: '../../assect/image/wheat.png',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d7',
    title: 'Wheat4',
    discription: 'Wheat is a grass widely cultivated for its seed, a cereal grain which is a worldwide staple food. The many species of wheat together make up the genus Triticum; the most widely grown is common wheat.',
    price: '11',
    unit: 'Kg',
    image: '../../assect/image/wheat.png',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d',
    title: 'Wheat5',
    discription: 'Wheat is a grass widely cultivated for its seed, a cereal grain which is a worldwide staple food. The many species of wheat together make up the genus Triticum; the most widely grown is common wheat.',
    price: '11',
    unit: 'Kg',
    image: '../../assect/image/wheat.png',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29',
    title: 'Wheat6',
    discription: 'Wheat is a grass widely cultivated for its seed, a cereal grain which is a worldwide staple food. The many species of wheat together make up the genus Triticum; the most widely grown is common wheat.',
    price: '11',
    unit: 'Kg',
    image: '../../assect/image/wheat.png',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e2',
    title: 'Wheat7',
    discription: 'Wheat is a grass widely cultivated for its seed, a cereal grain which is a worldwide staple food. The many species of wheat together make up the genus Triticum; the most widely grown is common wheat.',
    price: '11',
    unit: 'Kg',
    image: '../../assect/image/wheat.png',
  },
];

const dimension = Dimensions.get('screen');


const CartScreen = ({navigation}) =>{

  const {TotalAmount} = useContext(Context);

  const renderItem = ({ item }) => {  
    return(
      <ShowCard {...item} />
    );
  }

    return (
        <Container style={common.container}>
            <Header style={common.welcomeHeader}>
                <Body>
                    <Text style={common.welcomeHeaderText}>Welcome User</Text>
                </Body>
                <Right />
            </Header>
            <View style={common.topBottomSep}></View>
            <FlatList
                data={DATA}
                initialNumToRender= {6}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            <View style={Styles.amountDisplayRow}>
                <View style={Styles.amountView}>
                    <Text style={common.text}>
                        Total Amount
                    </Text>
                </View>
                <View style={Styles.totalAmount}>
                    <Text style={common.text}>
                        {TotalAmount}
                    </Text>
                </View>
            </View>
            <View style={Styles.centerBtnView}>
                <Button 
                onPress={() => navigation.navigate('SelectProvider')}
                disabled = {TotalAmount === 0 ? true : false } >
                    <Text>
                        Proceed To Order
                    </Text>
                </Button>
            </View>
        </Container>
    );
}

const Styles = StyleSheet.create({
    amountDisplayRow : {
        flexDirection : 'row',
    },
    amountView : {
      flex :1,
        padding : 30,
    },
    totalAmount : {
      flex : 1,
        padding:30,
        flexDirection : 'row-reverse',
    },
    centerBtnView : {
        alignSelf:'center',
        paddingBottom: 20,
    },
})

export default CartScreen;