import {ThemeProvider} from '@react-navigation/native';
import React, {useState, useContext, useRef} from 'react';
import {
  View,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  Card,
  Checkbox,
  Text,
  Button,
  useTheme,
  TouchableRipple,
  TextInput,
  Dialog,
  Portal,
  Paragraph,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

import common from '../Global/stylesheet';
import MyFastImage from './FastImage';

const ShowCard = ({item, updateCartQuantity, deleteCartItem, toggleSelect}) => {
  const theme = useTheme();

  const [dialogVisible, setDialogVisble] = useState(false);
  const [inputValue, setInputValue] = useState(item.cartQuantity.toString());

  const showDialog = () => {
    return (
      <Portal>
        <Dialog visible={dialogVisible} dismissable={false}>
          <Dialog.Title>Set Quantity</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              <TextInput
                value={inputValue}
                onChangeText={(text) => setInputValue(text)}
                keyboardType="numeric"
              />
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button uppercase={false} onPress={() => setDialogVisble(false)}>
              Cancel
            </Button>
            <Button
              uppercase={false}
              onPress={() => {
                setQuantity(inputValue);
                setDialogVisble(false);
              }}>
              Done
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  };

  function setQuantity(text) {
    if (parseInt(text) > 1) {
      updateCartQuantity(item.product._id, parseInt(text));
    } else {
      //going to 0
      ToastAndroid.show(
        'Cart quantity must be more than 0',
        ToastAndroid.SHORT,
      );
    }
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
    <>
      <Card
        style={{
          marginHorizontal: 20,
          marginBottom: 20,
          borderRadius: 15,
          borderWidth: 2,
          borderColor: 'lightgrey',
        }}>
        <Card.Content style={{flexDirection: 'row'}}>
          <View style={{flex: 3}}>
            <MyFastImage
              imageId={item.product._id}
              width={(Dimensions.get('screen').width / 100) * 30}
              height={100}
              borderRadius={5}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              flex: 4,
              justifyContent: 'space-between',
              marginLeft: 3,
            }}>
            <View>
              <Text style={common.text}>{item.product.name}</Text>
              <Text note style={{fontSize: 16, marginTop: 10}}>
                {'₹ '}
                {item.product.price}/{item.product.unit}
              </Text>
            </View>
            <View>
              <Checkbox
                status={item.isSelected ? 'checked' : 'unchecked'}
                onPress={() => toggleSelect(item.product._id)}
                // uncheckedColor="red"
                // color={theme.colors.primary}
              />
            </View>
          </View>
        </Card.Content>
        <Card.Content
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <Button
            icon="delete"
            mode="contained"
            labelStyle={{color: 'white'}}
            onPress={() => deleteCartItem(item.product._id)}
            style={{width: 120, borderRadius: 8}}
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
            <TouchableRipple
              onPress={() => {
                setDialogVisble(true);
              }}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                borderBottomWidth: 0.5,
              }}>
              <Text style={{fontSize: 17}}>{item.cartQuantity.toString()}</Text>
            </TouchableRipple>
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
      <Portal>
        <Dialog visible={dialogVisible} dismissable={false}>
          <Dialog.Title>Set Quantity</Dialog.Title>
          <Dialog.Content>
            <TextInput
              value={inputValue}
              onChangeText={(text) => setInputValue(text)}
              keyboardType="numeric"
              style={{marginHorizontal: 50, textAlign: 'center'}}
              mode="outlined"
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button uppercase={false} onPress={() => setDialogVisble(false)}>
              Cancel
            </Button>
            <Button
              uppercase={false}
              onPress={() => {
                setQuantity(inputValue);
                setDialogVisble(false);
              }}>
              Done
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
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
    textAlign: 'center',
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
    borderRadius: 15,
  },
});

export default ShowCard;
