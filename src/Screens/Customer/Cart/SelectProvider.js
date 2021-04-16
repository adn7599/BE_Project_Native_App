import React, {useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
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

const resp = {
  suppliersFound: [
    {
      _id: 'SP2222222222',
      name: 'Shardul',
      address: 'Dombivali',
      region: 'RMH0001',
      email: 'shardul@shardul.com',
      satisfiedOrders: [
        {
          product: 1002,
          satisfied: true,
          keepsInStock: true,
        },
        {
          product: 1001,
          satisfied: false,
          availableStock: 1,
          keepsInStock: true,
        },
        {
          product: 1003,
          satisfied: false,
          availableStock: 1,
          keepsInStock: false,
        },
      ],
      satisfiesNum: 1,
    },
    {
      _id: 'SP1111111111',
      name: 'Ajay',
      address: 'Koparkhairne',
      region: 'RMH0001',
      mobNo: '9911991199',
      email: 'ajay@ajay.com',
      satisfiedOrders: [
        {
          product: 1002,
          satisfied: true,
          keepsInStock: true,
        },
        {
          product: 1001,
          satisfied: true,
          keepsInStock: true,
        },
      ],
      satisfiesNum: 2,
    },
  ],
  cartInfo: {
    1001: {
      name: 'Wheat',
      unit: 'Kg',
      price: 20,
      cartQuantity: 3,
      cartCost: 60,
    },
    1002: {
      name: 'Rice',
      unit: 'Kg',
      price: 30,
      cartQuantity: 3,
      cartCost: 90,
    },
    1003: {
      name: 'Rice',
      unit: 'Kg',
      price: 30,
      cartQuantity: 3,
      cartCost: 90,
    },
    totalSelectedOrdersCost: 150,
    numberOfItemsSelected: 2,
  },
};

resp.selectedSupp = '';
resp.expandedSupp = '';

const SelectProviderScreen = ({navigation}) => {
  const [suppliers, setSuppliers] = useState(resp);

  const selectSupp = (supplierId) => {
    setSuppliers((prevSupp) => {
      prevSupp.selectSupp = supplierId;
      console.log(prevSupp);
      return {...prevSupp};
    });
  };

  const expandSupp = (supplierId) => {
    setSuppliers((prevSupp) => {
      prevSupp.expandedSupp = supplierId;
      return {...prevSupp};
    });
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
                    selected={suppliers.selectSupp === item._id}
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
          <Text style={common.welcomeHeaderText}>Welcome User</Text>
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
      </View>
      <View style={Styles.centerBtnView}>
        <Button
          onPress={() => navigation.navigate('RequestConfirmMsg')}
          disabled={suppliers.selectSupp === '' ? true : false}>
          <Text>Proceed To Order</Text>
        </Button>
      </View>
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
