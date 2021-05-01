import React, {useState, useEffect, useContext} from 'react';
import {
  Container,
  Left,
  Right,
  Thumbnail,
  Body,
  Content,
  Header,
  Item,
  Input,
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
  Surface,
  Divider,
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
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

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
    <Container>
      <Appbar.Header>
        <Appbar.Action
          size={33}
          style={{width: 20}}
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
          ListHeaderComponentStyle = {{paddingBottom : 20}}
        />
      ) : (
        <Loading />
      )}
    </Container>
  );
};

const ListItem = ({item, toggleAddToCart, userCred}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Card elevation={12} style={Sytles.card}>
      <Card.Content>
        <MyFastImage
          imageId={item.product._id}
          imageLoaded={imageLoaded}
          setImageLoaded={setImageLoaded}
        />
      </Card.Content>
      <Card.Content
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingTop: 10,
        }}>
        <View style={{}}>
          <Title>{item.product.name}</Title>
          <Paragraph>
            {item.product.price} Rs/{item.product.unit}
          </Paragraph>
        </View>
        <View style={{paddingTop: 5}}>
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
        </View>
      </Card.Content>

      <Card.Content>
        <Divider style={{borderBottomWidth: 0.5, marginVertical: 5}} />
        <TouchableOpacity
          style={{alignSelf: 'flex-end', flexDirection: 'row'}}
          onPress={() => setIsExpanded(!isExpanded)}>
          <Text note style={{fontWeight: '900', fontSize: 12}}>
            MORE INFO
          </Text>
          <Icon
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            size={15}
            color="lightgrey"
            style={{paddingLeft: 10}}
          />
        </TouchableOpacity>
        {isExpanded ? (
          <>
            <Text style={{paddingVertical: 10}}>
              {item.product.description}
            </Text>
            {userCred.role === 'customer' ? (
              <View>
                <Text style={{paddingTop: 10, fontStyle: 'italic'}}>
                  Alloted Quantity : {item.allotedQuantity}
                </Text>
                <Text
                  style={{
                    paddingTop: 3,
                    fontStyle: 'italic',
                    marginBottom: 10,
                  }}>
                  Available Quantity : {item.availableQuantity}
                </Text>
              </View>
            ) : (
              <View>
                <Text style={{paddingTop: 10, fontStyle: 'italic'}}>
                  Max Quantity : {item.maxQuantity}
                </Text>
                <Text style={{paddingTop: 3, fontStyle: 'italic'}}>
                  Available Quantity : {item.availableQuantity}
                </Text>
                <Text
                  style={{
                    paddingTop: 3,
                    fontStyle: 'italic',
                    marginBottom: 10,
                  }}>
                  Ordered Quantity : {item.orderedQuantity}
                </Text>
              </View>
            )}
          </>
        ) : (
          <View></View>
        )}
      </Card.Content>
    </Card>
  );
};

const Sytles = StyleSheet.create({
  container: {
    //backgroundColor: '#F9D1A3',
    elevation: 4,
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
    marginBottom: 20,
    borderRadius: 15,
  },
  cartButton: {
    width: 120,
    alignSelf: 'flex-end',
    borderRadius: 5,
  },
});

export default CustomerDashboardScreen;
