import React, {useContext, useState} from 'react';
import {Dimensions, View, FlatList, StyleSheet} from 'react-native';
import {Container, Body, Header, Right, Button, Text, Title} from 'native-base';

import common from '../../../Global/stylesheet';
import Context from '../../../Global/context';
import ShowCard from '../../../Component/ShowCard';

const resp = {
  _id: '1111111111',
  orders: [
    {
      product: {
        _id: 1002,
        name: 'Rice',
        description: 'Rice Description',
        unit: 'Kg',
        price: 30,
      },
      allotedQuantity: 25,
      availableQuantity: 5,
      cartQuantity: 3,
      cartCost: 90,
    },
    {
      product: {
        _id: 1001,
        name: 'Wheat',
        description: 'Wheat Description',
        unit: 'Kg',
        price: 20,
      },
      allotedQuantity: 20,
      availableQuantity: 20,
      cartQuantity: 3,
      cartCost: 60,
    },
  ],
  __v: 24,
  totalCartCost: 150,
};

resp.orders.forEach((item) => (item.isSelected = false));
resp.selectedItemsTotalAmount = 0;
console.log(resp);

const dimension = Dimensions.get('screen');

const CartScreen = ({navigation}) => {
  const [Cart, setCart] = useState(resp);

  const updateCartQuantity = (productId, newQuantity) => {
    setCart((prevCart) => {
      const item = prevCart.orders.find(
        (item) => item.product._id === productId,
      );
      item.cartQuantity = newQuantity;
      prevCart.selectedItemsTotalAmount =
        prevCart.selectedItemsTotalAmount - item.cartCost;
      item.cartCost = item.cartQuantity * item.product.price;
      prevCart.selectedItemsTotalAmount =
        prevCart.selectedItemsTotalAmount + item.cartCost;
      return {...prevCart};
    });
  };

  const deleteCartItem = (productId) => {
    setCart((prevCart) => {
      const loc = prevCart.orders.findIndex(
        (item) => item.product._id === productId,
      );
      prevCart.selectedItemsTotalAmount =
        prevCart.selectedItemsTotalAmount - prevCart.orders[loc].cartCost;
      prevCart.orders.splice(loc, 1);
      return {...prevCart};
    });
  };

  const toggleSelect = (productId) => {
    setCart((prevCart) => {
      const item = prevCart.orders.find(
        (item) => item.product._id === productId,
      );
      item.isSelected = !item.isSelected;
      if (item.isSelected) {
        prevCart.selectedItemsTotalAmount += item.cartCost;
      } else {
        prevCart.selectedItemsTotalAmount -= item.cartCost;
      }
      return {...prevCart};
    });
  };

  const renderItem = ({item}) => {
    return (
      <ShowCard
        item={item}
        updateCartQuantity={updateCartQuantity}
        deleteCartItem={deleteCartItem}
        toggleSelect={toggleSelect}
      />
    );
  };

  return (
    <Container style={common.container}>
      <Header style={common.headerColor}>
        <Left>
          <Icon
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            style={common.headerMenuBtn}
          />
        </Left>
        <Body>
          <Title style={common.headerText}>Profile</Title>
        </Body>
        <Right />
      </Header>

      <Header style={common.welcomeHeader}>
        <Body>
          <Text style={common.welcomeHeaderText}>Welcome User</Text>
        </Body>
        <Right />
      </Header>
      <View style={common.topBottomSep}></View>
      <FlatList
        data={Cart.orders}
        initialNumToRender={6}
        renderItem={renderItem}
        keyExtractor={(item) => item.product._id.toString()}
      />
      <View style={Styles.amountDisplayRow}>
        <View style={Styles.amountView}>
          <Text style={common.text}>Total Amount</Text>
        </View>
        <View style={Styles.totalAmount}>
          <Text style={common.text}>{Cart.selectedItemsTotalAmount}</Text>
        </View>
      </View>
      <View style={Styles.centerBtnView}>
        <Button
          onPress={() => navigation.navigate('SelectProvider')}
          disabled={Cart.selectedItemsTotalAmount === 0 ? true : false}>
          <Text>Proceed To Order</Text>
        </Button>
      </View>
    </Container>
  );
};

const Styles = StyleSheet.create({
  amountDisplayRow: {
    flexDirection: 'row',
  },
  amountView: {
    flex: 1,
    padding: 30,
  },
  totalAmount: {
    flex: 1,
    padding: 30,
    flexDirection: 'row-reverse',
  },
  centerBtnView: {
    alignSelf: 'center',
    paddingBottom: 20,
  },
});

export default CartScreen;
