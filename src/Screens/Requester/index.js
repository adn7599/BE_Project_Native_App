import React, {useState, useEffect, useContext} from 'react';
import {
  Container,
  // Card,
  // CardItem,
  Left,
  Right,
  Thumbnail,
  Body,
  Content,
  Header,
  Item,
  Input,
  Icon,
  Text,
} from 'native-base';

import {
  Appbar,
  Title,
  Paragraph,
  List,
  Button,
  Searchbar,
  Card,
  Provider as PaperProvider,
  useTheme,
} from 'react-native-paper';

import {
  Dimensions,
  FlatList,
  View,
  StyleSheet,
  Image,
  BackHandler,
  ToastAndroid,
  ScrollView,
} from 'react-native';

import useUserCred from '../../UserCredentials';
import {custReqQueries, suppReqQueries} from '../../serverQueries/Requester';
import common from '../../Global/stylesheet';
import Loading from '../../Component/Loading';
import MyFastImage from '../../Component/FastImage';

const CustomerDashboardScreen = ({navigation}) => {
  const [prodList, setProdList] = useState(null);
  const {userCred, userDetails, deleteUserCred} = useUserCred();
  const [showSearch, setShowSearch] = useState(false);

  const theme = useTheme();

  const selectedQueries =
    userCred.role === 'customer' ? custReqQueries : suppReqQueries;

  const loadScreen = async () => {
    const [respErr, resp] = await selectedQueries.getProducts(
      userCred.relayToken,
    );
    console.log('loaded resp', respErr, resp);
    if (respErr === null) {
      if (resp.status == 200) {
        setProdList(resp.data.commodities);
      } else if (resp.status == 403) {
        ToastAndroid.show('Token expired\nLogin again', ToastAndroid.LONG);
        await deleteUserCred();
      } else {
        setProdList(null);
        ToastAndroid.show(resp.data.error, ToastAndroid.LONG);
      }
    } else {
      setProdList(null);
      ToastAndroid.show(respErr.message, ToastAndroid.LONG);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('product screen focused');
      loadScreen();
    });
    return unsubscribe;
  }, []);
  const addRemoveCart = async (prodId, add) => {
    const [respErr, resp] = await selectedQueries.postCart(
      userCred.relayToken,
      prodId,
      add ? 1 : 0,
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

  const toggleAddToCart = async (productId) => {
    const item = prodList.find((prod) => prod.product._id === productId);
    const succ = await addRemoveCart(productId, !item.addedToCart);
    if (succ) {
      item.addedToCart = !item.addedToCart;
    }
    setProdList([...prodList]);
  };

  const renderItem = ({item}) => {
    return (
      <ListItem
        item={item}
        toggleAddToCart={toggleAddToCart}
        userCred={userCred}
      />
    );
  };

  return (
    <Container style={Sytles.container}>
      <Appbar.Header>
        <Appbar.Action
          size={33}
          icon="menu"
          onPress={() => navigation.openDrawer()}
        />
        <Appbar.Content title="Home" />
        <Appbar.Action
          size={33}
          icon="magnify"
          onPress={() => setShowSearch(!showSearch)}
        />
        <Appbar.Action
          size={33}
          icon="cart"
          onPress={() => navigation.navigate('Cart')}
        />
      </Appbar.Header>
      {showSearch ? (
        <View
          style={{backgroundColor: theme.colors.primary, paddingBottom: 10}}>
          <Searchbar
            placeholder="Search"
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              alignSelf: 'center',
              width: Dimensions.get('screen').width - 20,
              borderRadius: 5,
            }}
          />
        </View>
      ) : (
        <View />
      )}

      {/* PRODUCTS */}
      {prodList !== null ? (
        <FlatList
          data={prodList}
          initialNumToRender={4}
          renderItem={renderItem}
          keyExtractor={(item) => item.product._id.toString()}
          ListHeaderComponent={
            <Header style={Sytles.welcomeHeader}>
              <Body>
                <Text style={Sytles.welcomeHeaderText}>
                  Welcome,{' '}
                  {userCred.role === 'customer'
                    ? userDetails.fName
                    : userDetails.name}
                  !
                </Text>
              </Body>
            </Header>
          }
        />
      ) : (
        <Loading />
      )}
    </Container>
  );
};

const ListItem = ({item, toggleAddToCart, userCred}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <>
      <Card elevation={5} style={Sytles.card}>
        <Card.Content>
          <MyFastImage
            imageId={item.product._id}
            imageLoaded={imageLoaded}
            setImageLoaded={setImageLoaded}
          />
          <Title>{item.product.name}</Title>
          <Paragraph>
            {item.product.price} Rs/{item.product.unit}
          </Paragraph>
        </Card.Content>
        <Card.Content>
          <List.Accordion
            title="Product Info"
            style={{
              width: Dimensions.get('screen').width - 80,
            }}>
            <Text style={{paddingTop: 10, paddingLeft: 15}}>
              {item.product.description}
            </Text>
            {userCred.role === 'customer' ? (
              <View>
                <Text style={{paddingTop: 10, paddingLeft: 15}}>
                  Alloted Quantity : {item.allotedQuantity}
                </Text>
                <Text
                  style={{paddingTop: 10, paddingLeft: 15, marginBottom: 25}}>
                  Available Quantity : {item.availableQuantity}
                </Text>
              </View>
            ) : (
              <View>
                <Text style={{paddingTop: 10, paddingLeft: 15}}>
                  Max Quantity : {item.maxQuantity}
                </Text>
                <Text style={{paddingTop: 10, paddingLeft: 15}}>
                  Available Quantity : {item.availableQuantity}
                </Text>
                <Text
                  style={{paddingTop: 10, paddingLeft: 15, marginBottom: 25}}>
                  Ordered Quantity : {item.orderedQuantity}
                </Text>
              </View>
            )}
          </List.Accordion>
        </Card.Content>
        <Card.Content>
          <Button
            style={[
              Sytles.cartButton,
              {backgroundColor: item.addedToCart ? 'red' : 'green'},
            ]}
            icon="cart"
            mode="contained"
            onPress={() => toggleAddToCart(item.product._id)}>
            {item.addedToCart ? 'REMOVE' : 'ADD'}
          </Button>
        </Card.Content>
      </Card>
    </>
  );
};

const Sytles = StyleSheet.create({
  container: {
    backgroundColor: '#F9D1A3',
    // backgroundColor: '#fff',
  },
  welcomeHeader: {
    backgroundColor: '#E4E',
    height: 40,
  },
  welcomeHeaderText: {
    fontSize: 20,
    paddingLeft: 20,
    color: '#fff',
  },
  cardContainer: {
    marginHorizontal: 20,
    paddingVertical: 10,
  },
  card: {
    flex: 0,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  cartButton: {
    width: 120,
    alignSelf: 'flex-end',
  },
});

export default CustomerDashboardScreen;
