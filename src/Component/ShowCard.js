import {ThemeProvider} from '@react-navigation/native';
import React, {useState, useContext} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import {Card, Checkbox, Text, Button, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

import common from '../Global/stylesheet';
import MyFastImage from './FastImage';

const ShowCard = ({item, updateCartQuantity, deleteCartItem, toggleSelect}) => {
  const theme = useTheme();

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
    <Card style={Styles.card}>
      <Card.Content style={{flexDirection : 'row'}}>
        <View style ={{flex : 3}}>
        <MyFastImage 
        imageId = {item.product._id}
        width = {120}
        height = {100}
        borderRadius = {5}
        />
        </View>
        <View style ={{flexDirection : 'row',flex : 4,justifyContent : 'space-between'}}>
        <View >
          <Text style={common.text}>{item.product.name}</Text>
          <Text note style={{fontSize: 16,marginTop : 10}}>
            {'₹ '}{item.product.price}/{item.product.unit}
          </Text>
        </View>
        <View >
          <Checkbox
            status={item.isSelected ? 'checked' : 'unchecked'}
            onPress={() => toggleSelect(item.product._id)}
            uncheckedColor="red"
            color={theme.colors.primary}
          />
        </View>
        </View>
      </Card.Content>
      <Card.Content
        style={{flexDirection: 'row', justifyContent: 'space-between',marginTop : 10}}>
        <Button
          icon="delete"
          mode="contained"
          onPress={() => deleteCartItem(item.product._id)}
          style={{ width: 120, borderRadius: 8}}
          uppercase={false}
          color="red">
          Delete
        </Button>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => decrement()}
            style={{
              backgroundColor: theme.colors.primary,
              justifyContent: 'center',
              alignItems: 'center',
              width: 40,
              height: 40,
              borderRadius: 50,
            }}>
            <Icon name="minus" color="white" />
          </TouchableOpacity>
          <View>
            <TextInput
              value={item.cartQuantity.toString()}
              textAlign={'center'}
              keyboardType={'numeric'}
              returnKeyType={'done'}
              returnKeyLabel={'submitQuantity'}
              onChangeText={(text) => setQuantity(text)}
              editable={false}
              style={Styles.quantityText}
            />
          </View>
          <TouchableOpacity
            onPress={() => increment()}
            style={{
              backgroundColor: theme.colors.primary,
              justifyContent: 'center',
              alignItems: 'center',
              width: 40,
              height: 40,
              borderRadius: 50,
            }}>
            <Icon name="plus" color="white" />
          </TouchableOpacity>
        </View>
      </Card.Content>
    </Card>
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
    borderBottomWidth: 0.5,
    color: 'black',
  },
  itemAmount: {
    flex: 1,
    alignItems: 'flex-end',
    paddingStart: 10,
  },
  card: {
    marginBottom: 20,
    marginHorizontal: 20,
    elevation: 12,
  },
});

export default ShowCard;
