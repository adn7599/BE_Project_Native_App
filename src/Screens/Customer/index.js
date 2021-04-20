import React, {useEffect} from 'react';
import {
  Container,
  Card,
  CardItem,
  Left,
  Right,
  Thumbnail,
  Body,
  Content,
  Header,
  Item,
  Input,
  Icon,
  Button,
  Text,
  Title,
} from 'native-base';
import {
  Dimensions,
  FlatList,
  View,
  StyleSheet,
  Image,
  BackHandler,
  ToastAndroid,
} from 'react-native';

import useUserCred from '../../UserCredentials';
import {custReqQueries} from '../../serverQueries/Requester';
import common from '../../Global/stylesheet';
import {useState} from 'react/cjs/react.development';
import Loading from '../../Component/Loading';
import MyFastImage from '../../Component/FastImage';
import {List} from 'react-native-paper';

const CustomerDashboardScreen = ({navigation}) => {
  const [prodList, setProdList] = useState(null);
  const {userCred, userDetails, deleteUserCred} = useUserCred();

  const loadScreen = async () => {
    const [respErr, resp] = await custReqQueries.getProducts(
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
        ToastAndroid.show(resp.data.error, ToastAndroid.LONG);
      }
    } else {
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
  /*
  useFocusEffect(() => {
    loadScreen();
  }, []);
  */
  const addRemoveCart = async (prodId, add) => {
    const [respErr, resp] = await custReqQueries.postCart(
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
    return <ListItem item={item} toggleAddToCart={toggleAddToCart} />;
  };

  return (
    <Container style={Sytles.container}>
      <Header style={common.headerColor}>
        <Left>
          <Icon
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            style={common.headerMenuBtn}
          />
        </Left>
        <Body style={{alignItems: 'center', paddingLeft: 50}}>
          <Title style={common.headerText}>Home</Title>
        </Body>
        <Right>
          <Icon
            onPress={() => navigation.navigate('Cart')}
            name="md-cart"
            style={common.headerMenuBtn}
          />
        </Right>
      </Header>
      <Header searchBar rounded>
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
          <Text style={Sytles.welcomeHeaderText}>
            Welcome {userDetails.fName} {userDetails.lName}
          </Text>
        </Body>
        <Right />
      </Header>
      {prodList !== null ? (
        <FlatList
          data={prodList}
          initialNumToRender={4}
          renderItem={renderItem}
          keyExtractor={(item) => item.product._id.toString()}
        />
      ) : (
        <Loading />
      )}
    </Container>
  );
};

const ListItem = ({item, toggleAddToCart}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <>
      <Content style={Sytles.cardContainer}>
        <Card style={Sytles.card}>
          <CardItem>
            <Body>
              <MyFastImage
                imageId={item.product._id}
                imageLoaded={imageLoaded}
                setImageLoaded={setImageLoaded}
              />
              <CardItem>
                <Left>
                  <Body>
                    <Text>{item.product.name}</Text>
                    <Text note>
                      {item.product.price} Rs/{item.product.unit}
                    </Text>
                  </Body>
                </Left>
              </CardItem>
              
                <Body>
                  <List.Accordion
                    title="Product Info"
                    style={{width: Dimensions.get('screen').width - 80}}>
                    <Text style ={{paddingTop : 10, paddingLeft : 15}}>{item.product.description}</Text>
                    <Text style ={{paddingTop : 10, paddingLeft : 15}}>Alloted Quantity : {item.allotedQuantity}</Text>
                    <Text style ={{paddingTop : 10, paddingLeft : 15}}>Available Quantity : {item.availableQuantity}</Text>
                  </List.Accordion>
                </Body>
              <View style ={common.topBottomSep}></View>
              <Button
                textStyle={{color: '#87838B'}}
                style={[
                  Sytles.cartButton,
                  {backgroundColor: item.addedToCart ? 'red' : 'green'},
                ]}
                onPress={() => toggleAddToCart(item.product._id)}>
                <Icon name="cart" />
                <Text>{item.addedToCart ? 'REMOVE' : 'ADD'}</Text>
              </Button>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </>
  );
};

const Sytles = StyleSheet.create({
  container: {
    backgroundColor: '#F9D1A3',
  },
  welcomeHeader: {
    backgroundColor: '#E4B884',
  },
  welcomeHeaderText: {
    fontSize: 20,
    paddingLeft: 20,
  },
  cardContainer: {
    paddingHorizontal: 20,
  },
  card: {
    flex: 0,
  },
  cartButton: {
    alignSelf: 'flex-end',
  },
});

export default CustomerDashboardScreen;
