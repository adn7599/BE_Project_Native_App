import React, {useEffect} from 'react';
import {Container, Body, Header} from 'native-base';
import {
  Appbar,
  Title,
  Text,
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
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import useUserCred from '../../UserCredentials';
import {suppProvQueries, distProvQueries} from '../../serverQueries/Provider';
import common from '../../Global/stylesheet';
import {useState} from 'react/cjs/react.development';
import Loading from '../../Component/Loading';
import MyFastImage from '../../Component/FastImage';

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
    <>
      <Appbar.Header>
        <Appbar.Action
          color="white"
          size={33}
          icon="menu"
          onPress={() => navigation.openDrawer()}
        />
        <Appbar.Content color="white" title="Stock" />
      </Appbar.Header>
      {/* PRODUCTS */}
      {prodList !== null ? (
        <FlatList
          data={prodList}
          initialNumToRender={4}
          renderItem={renderItem}
          keyExtractor={(item) => item.product._id.toString()}
          ListHeaderComponent={<View></View>}
          ListHeaderComponentStyle={{paddingBottom: 20}}
        />
      ) : (
        <Loading />
      )}
    </>
  );
};

const ListItem = ({item, toggleAddToCart, userCred}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Card elevation={12} style={Sytles.card}>
      <Card.Content>
        <MyFastImage
          imageId={item.product._id}
          width={Dimensions.get('screen').width - 75}
          height={200}
          borderRadius={10}
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
          <Text
            style={{
              paddingTop: 3,
              marginBottom: 10,
              fontSize: 16,
              color: item.availableQuantity < 30 ? 'red' : 'green',
            }}>
            Available Quantity : {item.availableQuantity}
          </Text>
        </View>
        <View style={{paddingTop: 5}}>
          <Paragraph>
            {'₹ '}
            {item.product.price}/{item.product.unit}
          </Paragraph>
        </View>
      </Card.Content>
      <Card.Content>
        <Divider style={{borderBottomWidth: 0.5, marginVertical: 5}} />
        <TouchableOpacity
          style={{alignSelf: 'flex-end', flexDirection: 'row'}}
          onPress={() => setIsExpanded(!isExpanded)}>
          <Text style={{fontWeight: '900', fontSize: 12, color: 'lightgrey'}}>
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
            {userCred.role === 'SP' ? (
              <View>
                <Text style={{paddingTop: 10, fontStyle: 'italic'}}>
                  Max Quantity : {item.maxQuantity}
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
            ) : (
              <View></View>
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
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 15,
  },
  cartButton: {
    alignSelf: 'flex-end',
  },
});

export default ProviderStock;
