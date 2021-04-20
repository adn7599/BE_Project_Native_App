import React, {useState, useContext} from 'react';
import {Card, CardItem, Body, Content, Button, Text} from 'native-base';
import {View, TextInput, StyleSheet, ToastAndroid} from 'react-native';

import Context from '../Global/context';
import common from '../Global/stylesheet';

const ShowCard = ({item, updateCartQuantity, deleteCartItem, toggleSelect}) => {
  function setQuantity(text) {
    updateCartQuantity(item.product._id, parseInt(text));
  }

  function decrement() {
    if (item.cartQuantity > 1) {
      updateCartQuantity(item.product._id, item.cartQuantity - 1);
    } else {
      //going to 0
      ToastAndroid.show(
        'Cart quantity must be more than 0',
        ToastAndroid.SHORT,
      );
    }
  }

  function increment() {
    updateCartQuantity(item.product._id, item.cartQuantity + 1);
  }

  return (
    <Content style={common.cardContainer}>
      <Card style={common.card}>
        <CardItem>
          <Body>
            <View style={common.cardRow}>
              <View style={common.flexOne}>
                <Text style={common.text}>{item.product.name}</Text>
              </View>
              <View style={common.cardRowEnd}>
                <Button
                  onPress={() => toggleSelect(item.product._id)}
                  style={{width: 90}}>
                  <View style={{alignSelf: 'center'}}>
                    <Text style={Styles.btnText}>
                      {item.isSelected ? 'REMOVE' : 'ADD'}
                    </Text>
                  </View>
                </Button>
              </View>
            </View>
            <View style={common.cardRow}>
              <View style={common.flexOne}>
                <Text note style={common.text}>
                  {item.product.price} Rs/{item.product.unit}
                </Text>
              </View>
              <View style={common.cardRowEnd}>
                <View style={common.flexOne}>
                  <Button style={Styles.incDceBtn} onPress={() => increment()}>
                    <Text>+</Text>
                  </Button>
                </View>
                <View style={common.flexOne}>
                  <TextInput
                    value={item.cartQuantity.toString()}
                    textAlign={'center'}
                    keyboardType={'numeric'}
                    returnKeyType={'done'}
                    returnKeyLabel={'submitQuantity'}
                    onChangeText={(text) => setQuantity(text)}
                    editable={false}
                    //onSubmitEditing={(event) => setQuantity( event.nativeEvent.text)}
                    style={Styles.quantityText}
                  />
                </View>
                <View style={Styles.decView}>
                  <Button style={Styles.incDceBtn} onPress={() => decrement()}>
                    <Text>-</Text>
                  </Button>
                </View>
              </View>
            </View>
            <View style={common.cardRow}>
              <View style={common.flexOne}>
                <Text style={common.text}>Amount</Text>
              </View>
              <View style={Styles.itemAmount}>
                <Text>{item.cartCost}</Text>
              </View>
            </View>
            <View style={common.rightcornerBtn}>
              <Button onPress={() => deleteCartItem(item.product._id)}>
                <Text>Delete Item</Text>
              </Button>
            </View>
          </Body>
        </CardItem>
      </Card>
    </Content>
  );
};

const Styles = StyleSheet.create({
  btnText: {
    textAlign: 'center',
  },
  decView: {
    flex: 1,
    paddingLeft: 40,
  },
  incDceBtn: {
    width: 40,
    height: 40,
  },
  quantityText: {
    width: 40,
    height: 40,
    borderWidth: 1,
    color: 'black',
  },
  itemAmount: {
    flex: 1,
    alignItems: 'flex-end',
    paddingStart: 10,
  },
});

export default ShowCard;
