import React, { useContext,useEffect } from 'react';
import { 
    Container,Card,CardItem,
    Left,Right,Thumbnail,
    Body,Content,Header,
    Item, Input, Icon,
    Button, Text}
    from 'native-base';
import { Dimensions,FlatList, View,StyleSheet,BackHandler } from 'react-native';
import { useState } from 'react/cjs/react.development';

//import Context from '../../global/context';

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


const CustomerDashboardScreen = ({navigation}) =>{

    const [prodList,setProdList] = useState(resp.commodities);

    const toggleAddToCart = (productId) => {
        setProdList((prevProdList) => {
            const item = prodList.find((prod) => prod.product._id === productId)
            item.addedToCart = !item.addedToCart
            return [...prevProdList]
        })
    }

    const renderItem = ({ item }) => (
        <Content style={Sytles.cardContainer}>
            <Card style={Sytles.card}>
                <CardItem>
                    <Body>
                        <Thumbnail 
                            source={require('../../Assets/wheat.png')} 
                            style={Sytles.cardThumbnail} 
                        />
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
                        <Button 
                            textStyle={{ color: '#87838B' }} 
                            style={[Sytles.cartButton,
                                {backgroundColor : item.addedToCart ? 'red' : 'green'}]}
                            onPress={() => toggleAddToCart(item.product._id)}
                        >
                        <Icon name="cart" />
                        <Text>{item.addedToCart ? 'REMOVE' : 'ADD'}</Text>
                        </Button>
                    </Body>
                </CardItem>
            </Card>
        </Content> 
    );


    return (
        <Container style={Sytles.container}>
            <Header searchBar rounded >
                <Item>
                    <Icon name="ios-search" />
                    <Input placeholder="Search" />
                </Item>
                <Button transparent>
                    <Text>Search</Text>
                </Button>
            </Header>
            <Header style={Sytles.welcomeHeader}>
                <Body>
                    <Text style={Sytles.welcomeHeaderText}>Welcome User</Text>
                </Body>
                <Right />
            </Header>
            <FlatList
                data={prodList}
                initialNumToRender= {4}
                renderItem={renderItem}
                keyExtractor={item => item.product._id.toString()}
            />

        </Container>
    );
};

const Sytles = StyleSheet.create({
    container : {
        backgroundColor:'#F9D1A3',
    },
    welcomeHeader : {
        backgroundColor:'#E4B884',
    },
    welcomeHeaderText : {
        fontSize:20,
        paddingLeft:20
    },
    cardContainer : { 
        paddingHorizontal: 20, 
    },
    card :{
        flex : 0,
    },
    cardThumbnail : { 
        height: 200, 
        width: dimension.width - 80, 
        flex: 1 
    },
    cartButton : { 
        alignSelf: 'flex-end',
    },
});

export default CustomerDashboardScreen;