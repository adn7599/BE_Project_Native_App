import React, {useState} from 'react';
import {View, FlatList, StyleSheet, ToastAndroid} from 'react-native';
import {List} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  Container,
  Body,
  Content,
  Header,
  Card,
  CardItem,
  Radio,
  Left,
  Right,
  Button,
  Text,
} from 'native-base';

import common from '../../../Global/stylesheet';
import {useEffect} from 'react';
import useUserCred from '../../../UserCredentials';
import {custReqQueries} from '../../../serverQueries/Requester';
import Loading from '../../../Component/Loading';

const SelectProviderScreen = ({route, navigation}) => {
  const [locLong, locLat] = [72.9756461, 19.1869078];
  const [suppliers, setSuppliers] = useState(null);
  const [Range, setRange] = useState(100);

  const {userCred, userDetails, deleteUserCred} = useUserCred();

  const {orders} = route.params;
  console.log('Orders selected: ', orders);

  const loadScreen = async () => {
    const [respErr, resp] = await custReqQueries.getSuppliers(
      userCred.relayToken,
      locLong,
      locLat,
      orders,
      Range,
    );
    console.log('loaded resp', respErr, resp);
    if (respErr === null) {
      if (resp.status == 200) {
        const respData = {...resp.data};
        respData.selectedSupp = '';
        respData.expandedSupp = '';
        setSuppliers(respData);
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

  const selectSupp = (supplierId) => {
    const selectedSupp = suppliers.suppliersFound.find(
      (supp) => supp._id === supplierId,
    );
    if (
      selectedSupp.satisfiesNum === suppliers.cartInfo.numberOfItemsSelected
    ) {
      suppliers.selectedSupp = supplierId;
      console.log(suppliers);
      setSuppliers({...suppliers});
    } else {
      ToastAndroid.show(
        'This does not satisfy your all orders',
        ToastAndroid.SHORT,
      );
    }
  };

  const expandSupp = (supplierId) => {
    setSuppliers((prevSupp) => {
      prevSupp.expandedSupp = supplierId;
      return {...prevSupp};
    });
  };

  const getBuiltRequest = () => {
    const ttpToken = userCred.ttpToken;
    const relayToken = userCred.relayToken;
    const requester_id = userCred.reg_id;
    const provider_id = suppliers.selectedSupp;
    console.log('selected supplier: ' + suppliers.selectedSupp);
    const ordersArray = [];

    orders.forEach((ord) => {
      const constructedOrd = {
        product: ord,
        quantity: suppliers.cartInfo[ord].cartQuantity,
        totalCost: suppliers.cartInfo[ord].cartCost,
      };
      ordersArray.push(constructedOrd);
    });

    const payment_amount = suppliers.cartInfo.totalSelectedOrdersCost;

    return {
      ttpToken,
      relayToken,
      requester_id,
      provider_id,
      ordersArray,
      payment_amount,
    };
  };

  const renderItem = ({item}) => {
    let satisfied = '';
    let partiallySat = '';
    let notSatisfied = '';

    item.satisfiedOrders.forEach((ord) => {
      if (ord.keepsInStock) {
        if (ord.satisfied) {
          satisfied += `${suppliers.cartInfo[ord.product].name} \n`;
        } else if (ord.availableStock) {
          const myCartInfo = suppliers.cartInfo[ord.product];
          partiallySat += `${myCartInfo.name}   ${ord.availableStock}/${myCartInfo.cartQuantity} \n`;
        } else {
          notSatisfied += `${suppliers.cartInfo[ord.product].name} \n`;
        }
      } else {
        notSatisfied += `${suppliers.cartInfo[ord.product].name}\n `;
      }
    });

    return (
      <Content style={common.cardContainer}>
        <Card style={common.card}>
          <CardItem>
            <Body>
              <View style={common.cardRow}>
                <View style={common.flexOne}>
                  <Text style={common.text}>{item.name}</Text>
                </View>
                <View style={common.cardRowEnd}>
                  <Radio
                    color={'#f0ad4e'}
                    selectedColor={'#5cb85c'}
                    selected={suppliers.selectedSupp === item._id}
                    onPress={() => selectSupp(item._id)}
                  />
                </View>
              </View>
              <View style={common.flexOne}>
                <Text>Address : {item.address}</Text>
              </View>
              <View style={Styles.accordionView}>
                <List.Accordion
                  title={`Item Satisfied ${item.satisfiesNum}/${suppliers.cartInfo.numberOfItemsSelected}`}
                  expanded={suppliers.expandedSupp === item._id}
                  onPress={() => expandSupp(item._id)}>
                  <Text style={Styles.itemSatisfied}>
                    item Satisfied {'\n'}
                    {satisfied}
                  </Text>
                  <Text style={Styles.itemPartSatisfied}>
                    item Partially Satisfied {'\n'}
                    {partiallySat}
                  </Text>
                  <Text style={Styles.itemNotSatisfied}>
                    item Not Satisfied {'\n'}
                    {notSatisfied}
                  </Text>
                </List.Accordion>
              </View>
            </Body>
          </CardItem>
        </Card>
      </Content>
    );
  };

  return (
    <Container style={common.container}>
      <Header style={common.welcomeHeader}>
        <Body>
          <Text style={common.welcomeHeaderText}>
            {' '}
            Welcome {userDetails.fName} {userDetails.lName}
          </Text>
        </Body>
        <Right />
      </Header>
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
      {suppliers !== null ? (
        <>
          <FlatList
            data={suppliers.suppliersFound}
            initialNumToRender={6}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
          />
          <View style={{flexDirection: 'row'}}>
            <View style={Styles.amountView}>
              <Text style={common.text}>Total Amount</Text>
            </View>
            <View style={Styles.amountView}>
              <Text style={common.text}>
                {suppliers.cartInfo.totalSelectedOrdersCost}
              </Text>
            </View>
          </View>
          <View style={Styles.centerBtnView}>
            <Button
              onPress={() => [
                navigation.navigate('RequestConfirmMsg', {
                  request: getBuiltRequest(),
                }),
                console.log(suppliers.selectSupp),
              ]}
              disabled={suppliers.selectedSupp === ''}>
              <Text>Proceed To Order</Text>
            </Button>
          </View>
        </>
      ) : (
        <Loading />
      )}
    </Container>
  );
};

const Styles = StyleSheet.create({
  accordionView: {
    flex: 1,
    width: 330,
  },
  itemSatisfied: {
    paddingLeft: 20,
    color: 'green',
  },
  itemPartSatisfied: {
    paddingLeft: 20,
    color: 'orange',
  },
  itemNotSatisfied: {
    paddingLeft: 20,
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
