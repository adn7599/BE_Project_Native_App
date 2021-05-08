import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  View,
  FlatList,
  StyleSheet,
  ToastAndroid,
  SafeAreaView,
} from 'react-native';
import {Container} from 'native-base';
import RNLocation from 'react-native-location';

import {Appbar, Text, Button} from 'react-native-paper';

import common from '../../../Global/stylesheet';
import ShowCard from '../../../Component/ShowCard';
import {custReqQueries, suppReqQueries} from '../../../serverQueries/Requester';
import useUserCred from '../../../UserCredentials';
import MyContainer from '../../../Component/MyContainer';

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
        let respData;
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
    return selectedOrders.map((ord) => ord.product._id);
  };

  const proceedNext = () => {
    //Location not required in case of supplier
    if (userCred.role === 'SP') {
      navigation.navigate('SelectProvider', {
        orders: getSelectedOrdersList(),
        location: null,
      });
    } else {
      //User role is customer
      //First need to get Location
      //Location permission required first

      RNLocation.configure({
        distanceFilter: 5.0,
        desiredAccuracy: {
          ios: 'best',
          android: 'balancedPowerAccuracy',
        },
        //androidProvider: 'standard',
      });

      RNLocation.requestPermission({
        //ios: 'whenInUse',
        android: {
          detail: 'fine', // or 'fine'
          rationale: {
            title: 'We need to access your location',
            message: 'We need your location to show you the Suppliers near you',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        },
      }).then((granted) => {
        if (granted) {
          RNLocation.getLatestLocation()
            .then((location) => {
              console.log('current location', location);
              if (location === null) {
                ToastAndroid.show(
                  'Invalid location received!',
                  ToastAndroid.SHORT,
                );
              } else {
                //Valid location going to next screen
                navigation.navigate('SelectProvider', {
                  orders: getSelectedOrdersList(),
                  location: {
                    latitude: location.latitude,
                    longitude: location.longitude,
                  },
                });
              }
            })
            .catch((err) => {
              console.log('Location error: ', err);
            });
        } else {
          ToastAndroid.show(
            'Need to provide location permission for selecting Providers',
            ToastAndroid.LONG,
          );
        }
      });
    }
  };

  return (
    <MyContainer>
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.pop()} />
        <Appbar.Content color="white" title="Cart" />
      </Appbar.Header>
      {Cart !== null ? (
        <>
          <FlatList
            data={Cart.orders}
            initialNumToRender={6}
            renderItem={renderItem}
            keyExtractor={(item) => item.product._id.toString()}
            ListHeaderComponent={<View></View>}
            ListHeaderComponentStyle={{paddingBottom: 20}}
            ListEmptyComponent={
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 17, fontStyle: 'italic'}}>
                  Cart Empty!!
                </Text>
              </View>
            }
            // ListFooterComponent={{}

            // }
            // ListFooterComponentStyle={{justifyContent: 'flex-end'}}
          />
          <View
            style={{
              backgroundColor: '#3498db',
              borderTopStartRadius: 30,
              borderTopEndRadius: 30,
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 20,
                marginBottom: 20,
                marginTop: 30,
                justifyContent: 'space-between',
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 23}}>Total Cost</Text>
              <Text style={{fontWeight: 'bold', fontSize: 23}}>
                {'₹ '}
                {Cart.selectedItemsTotalAmount}
              </Text>
            </View>
            <View style={Styles.centerBtnView}>
              <Button
                onPress={() => proceedNext()}
                disabled={Cart.selectedItemsTotalAmount === 0 ? true : false}
                uppercase={false}
                mode="contained"
                labelStyle={{fontSize: 18, color: 'white'}}
                style={{borderRadius: 10}}>
                Proceed To Order
              </Button>
            </View>
          </View>
        </>
      ) : (
        <Loading />
      )}
    </MyContainer>
  );
};

const Styles = StyleSheet.create({
  amountDisplayRow: {
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'space-between',
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
