import React, {useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {Container} from 'native-base';

import {
  Button,
  Card,
  Text,
  RadioButton,
  useTheme,
  Appbar,
  Chip,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

import common from '../../../Global/stylesheet';
import {useEffect} from 'react';
import useUserCred from '../../../UserCredentials';
import {custReqQueries, suppReqQueries} from '../../../serverQueries/Requester';
import Loading from '../../../Component/Loading';
import MyContainer from '../../../Component/MyContainer';

const SelectProviderScreen = ({route, navigation}) => {
  const [locLong, locLat] = [72.9756461, 19.1869078];
  const [providers, setProviders] = useState(null);
  const [Range, setRange] = useState(100);

  const {userCred, userDetails, deleteUserCred} = useUserCred();

  const themes = useTheme();

  const {orders} = route.params;
  console.log('Orders selected: ', orders);

  const loadScreen = async () => {
    let respArr;
    if (userCred.role === 'customer') {
      respArr = await custReqQueries.getSuppliers(
        userCred.relayToken,
        locLong,
        locLat,
        orders,
        Range,
      );
    } else {
      respArr = await suppReqQueries.getDistributors(
        userCred.relayToken,
        orders,
      );
    }
    const [respErr, resp] = respArr;
    console.log('loaded resp', respErr, resp);
    if (respErr === null) {
      if (resp.status == 200) {
        const respData = {...resp.data};
        respData.selectedProv = '';
        respData.expandedProv = '';
        setProviders(respData);
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
      console.log('select provider screen focused');
      loadScreen();
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    loadScreen();
  }, [Range]);

  const selectProv = (providerId) => {
    const providerFound =
      userCred.role === 'customer' ? 'suppliersFound' : 'DistributorsFound';

    const selectedProv = providers[providerFound].find(
      (prov) => prov._id === providerId,
    );
    if (
      selectedProv.satisfiesNum === providers.cartInfo.numberOfItemsSelected
    ) {
      providers.selectedProv = providerId;
      console.log(providers);
      setProviders({...providers});
    } else {
      ToastAndroid.show(
        'This does not satisfy your all orders',
        ToastAndroid.SHORT,
      );
    }
  };

  const expandProv = (providerId) => {
    setProviders((prevProv) => {
      prevProv.expandedProv = providerId;
      return {...prevProv};
    });
  };

  const getBuiltRequest = () => {
    const ttpToken = userCred.ttpToken;
    const relayToken = userCred.relayToken;
    const requester_id = userCred.reg_id;
    const provider_id = providers.selectedProv;
    console.log('selected provider: ' + providers.selectedProv);
    const ordersArray = [];

    orders.forEach((ord) => {
      const constructedOrd = {
        product: ord,
        quantity: providers.cartInfo[ord].cartQuantity,
        totalCost: providers.cartInfo[ord].cartCost,
      };
      ordersArray.push(constructedOrd);
    });

    const payment_amount = providers.cartInfo.totalSelectedOrdersCost;

    return {
      ttpToken,
      relayToken,
      requester_id,
      provider_id,
      ordersArray,
      payment_amount,
    };
  };

  const RangeSelector = () => {
    if (userCred.role === 'customer') {
      return (
        <>
          <View style={Styles.rangeView}>
            <View style={common.flexOne}>
              <Text style={common.text}>Range</Text>
            </View>
            <View style={common.flexOne}>
              <DropDownPicker
                items={[
                  {label: '100 m', value: 100},
                  {label: '200 m', value: 200},
                  {label: '300 m', value: 300},
                  {label: '400 m', value: 400},
                  {label: '500 m', value: 500},
                ]}
                defaultValue={Range}
                containerStyle={{height: 40}}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                dropDownStyle={{backgroundColor: '#fafafa'}}
                onChangeItem={(item) => setRange(item.value)}
              />
            </View>
          </View>
        </>
      );
    } else {
      return <View style={{paddingTop: 20}}></View>;
    }
  };

  const renderItem = ({item}) => {
    let satisfied = [];
    let partiallySat = [];
    let notSatisfied = [];
    let cartItems;
    let itemSatColor;
    let itemSatMsg;

    item.satisfiedOrders.forEach((ord) => {
      if (ord.keepsInStock) {
        if (ord.satisfied) {
          satisfied.push(
            <View key={ord.product} style={{padding: 5}}>
              <Chip
                mode="flat"
                style={{backgroundColor: 'green'}}
                textStyle={{color: 'white', fontSize: 13}}>
                {providers.cartInfo[ord.product].name}
              </Chip>
            </View>,
          );
        } else if (ord.availableStock) {
          const myCartInfo = providers.cartInfo[ord.product];
          partiallySat.push(
            <View key={ord.product} style={{padding: 5}}>
              <Chip
                mode="flat"
                style={{backgroundColor: 'orange'}}
                textStyle={{color: 'white', fontSize: 13}}>
                {`${myCartInfo.name}   ${ord.availableStock}/${myCartInfo.cartQuantity}`}
              </Chip>
            </View>,
          );
        } else {
          notSatisfied.push(
            <View key={ord.product} style={{padding: 5}}>
              <Chip
                mode="flat"
                style={{backgroundColor: 'red'}}
                textStyle={{color: 'white', fontSize: 13}}>
                {providers.cartInfo[ord.product].name}
              </Chip>
            </View>,
          );
        }
      } else {
        notSatisfied.push(
          <View key={ord.product} style={{padding: 5}}>
            <Chip
              mode="flat"
              style={{backgroundColor: 'red'}}
              textStyle={{color: 'white', fontSize: 13}}>
              {providers.cartInfo[ord.product].name}
            </Chip>
          </View>,
        );
      }
      cartItems = [...satisfied, ...partiallySat, ...notSatisfied];
    });

    if (item.satisfiesNum === providers.cartInfo.numberOfItemsSelected) {
      itemSatColor = 'green';
      itemSatMsg = 'All items available!';
    } else if (item.satisfiesNum === 0) {
      itemSatColor = 'red';
      itemSatMsg = 'No items available';
    } else {
      itemSatColor = 'orange';
      itemSatMsg = `Some items unavailable (${item.satisfiesNum}/${providers.cartInfo.numberOfItemsSelected})`;
    }

    return (
      <Card
        style={{
          marginHorizontal: 20,
          marginBottom: 20,
          elevation: 12,
          borderRadius: 15,
        }}>
        <Card.Content
          style={{
            flexDirection: 'row',
            paddingBottom: 10,
            justifyContent: 'space-between',
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>{item.name}</Text>
          <RadioButton
            // color={themes.colors.primary}
            // uncheckedColor="red"
            status={
              providers.selectedProv === item._id ? 'checked' : 'unchecked'
            }
            onPress={() => selectProv(item._id)}
          />
        </Card.Content>
        <Card.Content>
          <View style={common.flexOne}>
            <Text style={{fontSize: 16, fontStyle: 'italic'}}>Address </Text>
            <Text>{item.address}</Text>
          </View>
        </Card.Content>
        <Card.Content>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 15,
              paddingBottom: 5,
            }}
            onPress={() => expandProv(item._id)}>
            <Text
              style={{fontWeight: 'bold', fontSize: 16, color: itemSatColor}}>
              {itemSatMsg}
            </Text>
            <Icon
              name={
                providers.expandedProv === item._id
                  ? 'chevron-up'
                  : 'chevron-down'
              }
              size={15}
              color="lightgrey"
              style={{paddingLeft: 10}}
            />
          </TouchableOpacity>
          {providers.expandedProv === item._id ? (
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {cartItems}
            </View>
          ) : (
            <View></View>
          )}
        </Card.Content>
      </Card>
    );
  };

  return (
    <MyContainer>
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.pop()} />
        <Appbar.Content color="white" title="Select Provider" />
      </Appbar.Header>
      <RangeSelector />
      {providers !== null ? (
        <>
          <FlatList
            data={
              providers[
                userCred.role === 'customer'
                  ? 'suppliersFound'
                  : 'DistributorsFound'
              ]
            }
            initialNumToRender={6}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
          />

          <View
            style={{
              backgroundColor: '#3498db',
              borderTopStartRadius: 30,
              borderTopEndRadius: 30,
              shadowRadius: 10,
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowColor: '#000000',
              shadowOpacity: 0.9,
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
                {providers.cartInfo.totalSelectedOrdersCost}
              </Text>
            </View>
            <View style={Styles.centerBtnView}>
              <Button
                onPress={() => [
                  navigation.navigate('RequestConfirmMsg', {
                    request: getBuiltRequest(),
                  }),
                  console.log(providers.selectedProv),
                ]}
                disabled={providers.selectedProv === ''}
                uppercase={false}
                mode="contained"
                labelStyle={{fontSize: 18}}
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
  accordionView: {
    flex: 1,
    width: 330,
  },
  itemSatisfied: {
    color: 'green',
  },
  itemPartSatisfied: {
    color: 'orange',
  },
  itemNotSatisfied: {
    color: 'red',
  },
  rangeView: {
    padding: 20,
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

export default SelectProviderScreen;
