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
import {suppProvQueries, distProvQueries} from '../../serverQueries/Provider';
import common from '../../Global/stylesheet';
import {useState} from 'react/cjs/react.development';
import Loading from '../../Component/Loading';
import MyFastImage from '../../Component/FastImage';
import {List} from 'react-native-paper';

const ProviderStock = ({navigation}) => {
  const [prodList, setProdList] = useState(null);
  const {userCred, userDetails, deleteUserCred} = useUserCred();
  const selectedQueries =
    userCred.role === 'SP' ? suppProvQueries : distProvQueries;

  const loadScreen = async () => {
    const [respErr, resp] = await selectedQueries.getStock(userCred.relayToken);
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
      console.log('Provider stock screen focused');
      loadScreen();
    });
    return unsubscribe;
  }, []);

  const renderItem = ({item}) => {
    return <ListItem item={item} userCred={userCred} />;
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
        <Body>
          <Title style={common.headerText}>Stock</Title>
        </Body>
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
            Welcome {userDetails.name}
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

const ListItem = ({item, toggleAddToCart, userCred}) => {
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
                  <Text style={{paddingTop: 10, paddingLeft: 15}}>
                    {item.product.description}
                  </Text>
                  {userCred.role === 'SP' ? (
                    <View>
                      <Text style={{paddingTop: 10, paddingLeft: 15}}>
                        Max Quantity : {item.maxQuantity}
                      </Text>
                      <Text style={{paddingTop: 10, paddingLeft: 15}}>
                        Available Quantity : {item.availableQuantity}
                      </Text>
                      <Text style={{paddingTop: 10, paddingLeft: 15}}>
                        Ordered Quantity : {item.orderedQuantity}
                      </Text>
                    </View>
                  ) : (
                    <View>
                      <Text style={{paddingTop: 10, paddingLeft: 15}}>
                        Available Quantity : {item.availableQuantity}
                      </Text>
                    </View>
                  )}
                </List.Accordion>
              </Body>
              <View style={common.topBottomSep}></View>
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

export default ProviderStock;
