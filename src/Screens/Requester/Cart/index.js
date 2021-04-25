import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  View,
  FlatList,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import {
  Container,
  Body,
  Header,
  Right,
  Left,
  Icon,
  Button,
  Text,
  Title,
} from 'native-base';

import common from '../../../Global/stylesheet';
import ShowCard from '../../../Component/ShowCard';
import {custReqQueries,suppReqQueries} from '../../../serverQueries/Requester';
import useUserCred from '../../../UserCredentials';

import Loading from '../../../Component/Loading';

const dimension = Dimensions.get('screen');

const CartScreen = ({navigation}) => {
  const [Cart, setCart] = useState(null);
  const {userCred, userDetails, deleteUserCred} = useUserCred();
  const selectedQueries =
    userCred.role === 'customer' ? custReqQueries : suppReqQueries;

  const loadScreen = async () => {
    const [respErr, resp] = await selectedQueries.getCart(userCred.relayToken);
    console.log('loaded resp', respErr, resp);
    if (respErr === null) {
      if (resp.status == 200) {
        respData = {...resp.data};

        respData.orders.forEach((item) => (item.isSelected = false));
        respData.selectedItemsTotalAmount = 0;

        console.log(respData);
        setCart(respData);
      } else if (resp.status == 403) {
        ToastAndroid.show('Token expired\nLogin again', ToastAndroid.LONG);
        await deleteUserCred();
      } else {
        ToastAndroid.show(resp.data.error, ToastAndroid.LONG);
      }
    } else {
      ToastAndroid.show(respErr.message, ToastAndroid.LONG);
    }
  };

  useEffect(() => {
    loadScreen();
  }, []);

  const updateCartServer = async (prodId, newQuantity) => {
    const [respErr, resp] = await selectedQueries.postCart(
      userCred.relayToken,
      prodId,
      newQuantity,
    );
    console.log('loaded resp', respErr, resp);
    if (respErr === null) {
      if (resp.status == 200) {
        return true;
      } else if (resp.status == 403) {
        ToastAndroid.show('Token expired\nLogin again', ToastAndroid.LONG);
        await deleteUserCred();
        return false;
      } else {
        ToastAndroid.show(resp.data.error, ToastAndroid.LONG);
        return false;
      }
    } else {
      ToastAndroid.show(respErr.message, ToastAndroid.LONG);
      return false;
    }
  };

  const updateCartQuantity = async (productId, newQuantity) => {
    const item = Cart.orders.find((item) => item.product._id === productId);

    const succ = await updateCartServer(productId, newQuantity);

    if (succ) {
      item.cartQuantity = newQuantity;
      //saving old cost
      const oldCost = item.cartCost;
      //new cost
      item.cartCost = item.cartQuantity * item.product.price;

      if (item.isSelected) {
        Cart.selectedItemsTotalAmount =
          Cart.selectedItemsTotalAmount - oldCost + item.cartCost;
      }
    }
    setCart({...Cart});
  };

  const deleteCartItem = async (productId) => {
    const loc = Cart.orders.findIndex((item) => item.product._id === productId);

    const succ = await updateCartServer(productId, 0);

    if (succ) {
      if (Cart.orders[loc].isSelected) {
        Cart.selectedItemsTotalAmount =
          Cart.selectedItemsTotalAmount - Cart.orders[loc].cartCost;
      }
      Cart.orders.splice(loc, 1);
    }

    setCart({...Cart});
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

  const getSelectedOrdersList = () => {
    const selectedOrders = Cart.orders.filter((ord) => ord.isSelected === true);
    return selectedOrders.map((ord) => ord.product._id)
  }

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
          <Title style={common.headerText}>Cart</Title>
        </Body>
      </Header>

      <Header style={common.welcomeHeader}>
        <Body>
          <Text style={Styles.welcomeHeaderText}>
            Welcome {userDetails.fName} {userDetails.lName}
          </Text>
        </Body>
        <Right />
      </Header>
      <View style={common.topBottomSep}></View>
      {Cart !== null ? (
        <>
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
              onPress={() => navigation.navigate('SelectProvider',{orders: getSelectedOrdersList()})}
              disabled={Cart.selectedItemsTotalAmount === 0 ? true : false}>
              <Text>Proceed To Order</Text>
            </Button>
          </View>
        </>
      ) : (
        <Loading />
      )}
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
