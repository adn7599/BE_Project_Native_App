import React, {useState } from 'react';
import { View,FlatList,StyleSheet} from 'react-native';
import { List } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { 
  Container,Body,Content,Header,
  Card,CardItem,Radio,Left,
  Right,Button,Text, }
  from 'native-base';

import common from '../../../Global/stylesheet';

const DATA = [
    {
        id: "Sp1111111111",
        name: 'Supplier 1',
        address: 'xxxx'
    },
    {
        id: "Sp1111111112",
        name: 'Supplier 2',
        address: 'xxxx'
    },
    {
        id: "Sp1111111113",
        name: 'Supplier 3',
        address: 'xxxx'
    },
    {
        id: "Sp1111111114",
        name: 'Supplier 4',
        address: 'xxxx'
    },
    {
        id: "Sp1111111115",
        name: 'Supplier 5',
        address: 'xxxx'
    },
    {
        id: "Sp1111111116",
        name: 'Supplier 6',
        address: 'xxxx'
    },
    {
        id: "Sp1111111117",
        name: 'Supplier 7',
        address: 'xxxx'
    },
];



const SelectProviderScreen = ({navigation}) =>{

  const [Selected,setSelected] = useState('');
  const [Expanded,setExpanded] = useState('');
  const [Range,setRange] = useState(100);


  const renderItem = ({ item }) => {  
    return(
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
                color={"#f0ad4e"}
                selectedColor={"#5cb85c"}
                selected={Selected === item.id ? true: false}
                onPress={() => setSelected(item.id)}
              />
              </View>
            </View>
            <View style={common.flexOne}>
                <Text>
                  Address : {item.address}
                </Text>
            </View>
            <View style ={Styles.accordionView}>
              <List.Accordion title = "Item Satisfied 3/4"
                expanded={Expanded === item.id ? true:false}
                onPress={() => setExpanded(item.id)}>
                <Text style={Styles.itemSatisfied}>
                item Satisfied {'\n'}Item 1, Item 2, Item 3
                </Text>
                <Text style={Styles.itemPartSatisfied}>
                item Partially Satisfied {'\n'}Item 4   3/5{'\n'}Item 5   2/5{'\n'}Item 6   4/6
                </Text>
                <Text style={Styles.itemNotSatisfied}>
                item Not Satisfied {'\n'}Item 7, Item 8, Item 9
                </Text>
              </List.Accordion>
            </View>
          </Body>
        </CardItem>
      </Card>
    </Content>
    );
  }

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
            <Text style ={common.text}>
              Range
            </Text>
          </View>
          <View style={common.flexOne}>
          <DropDownPicker
            items={[
                {label:'100 m', value: 100},
                {label:'200 m', value: 200},
                {label:'300 m', value: 300},
                {label:'400 m', value: 400},
                {label:'500 m', value: 500},
              ]}
            defaultValue={Range}
            containerStyle={{height: 40}}
            itemStyle={{
                justifyContent: 'flex-start'
            }}
            dropDownStyle={{backgroundColor: '#fafafa'}}
            onChangeItem={ item => setRange(item.value)}
        />
          </View>
        </View>
        <FlatList
            data={DATA}
            initialNumToRender= {6}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        <View style={{flexDirection:'row'}}>
          <View style={Styles.amountView}>
            <Text style={common.text}>
              Total Amount
            </Text>
          </View>
        </View>
        <View style={Styles.centerBtnView}>
        <Button 
          onPress ={() => navigation.navigate('RequestConfirmMsg')}
          disabled ={Selected === "" ? true : false}>
          <Text>
            Proceed To Order
          </Text>
        </Button>
        </View>
      </Container>
    );
}

const Styles = StyleSheet.create({
  accordionView : {
    flex :1,
    width : 330,
  },
  itemSatisfied : {
    paddingLeft:20,
    color:'green',
  },
  itemPartSatisfied : {
    paddingLeft:20,
    color:'orange',
  },
  itemNotSatisfied : {
    paddingLeft:20,
    color:'red',
  },
  rangeView : {
    padding:20,
    flexDirection:'row',
  },
  amountView : {
    flex :1,
      padding : 30,
  },
  totalAmount : {
    flex : 1,
      padding:30,
      flexDirection : 'row-reverse',
  },
  centerBtnView : {
    alignSelf:'center',
    paddingBottom: 20,
  },
})

export default SelectProviderScreen;