import React, { useContext,useState } from 'react';
import { 
  Container,Body,Content,Header,
  Card,CardItem,Radio,Left,
  Right,Item, Input,Icon,
  Button,Text, Title,Form,
  Picker,
  } from 'native-base';
import { Dimensions,View,FlatList,} from 'react-native';
import { List } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';



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
      <Content style={{ paddingHorizontal: 20 }}>
      <Card style={{ flex: 0 }}>
        <CardItem>
        <Body>
            <View style={{flex:1 ,flexDirection:'row',paddingBottom:10}}>
              <View style={{flex:1}}>
                <Text style={{fontSize:20}}>{item.name}</Text>
              </View>
              <View style={{flex:1 ,paddingLeft:135,alignItems:'flex-end'}}>
              <Radio
                color={"#f0ad4e"}
                selectedColor={"#5cb85c"}
                
                selected={Selected === item.id ? true: false}
                onPress={() => setSelected(item.id)}
              />
              </View>
            </View>
            <View style={{flex:1,paddingBottom:10}}>
                <Text>
                  Address : {item.address}
                </Text>
            </View>
            <View style ={{flex :1,width : 330}}>
              <List.Accordion title = "Item Satisfied 3/4"
                expanded={Expanded === item.id ? true:false}
                onPress={() => setExpanded(item.id)}>
                <List.Item title="item Satisfied : Item 1, item 2 ,Item 4" />
                <List.Item title="Item Not satisfied : item 3" />
              </List.Accordion>
            </View>
          </Body>
        </CardItem>
      </Card>
    </Content>
    );
  }

    return (
      <Container style={{backgroundColor:'#F9D1A3'}}>
        <Header style={{backgroundColor:'#E4B884'}}>
            <Body>
            <Text style={{fontSize:20,paddingLeft:20}}>Welcome User</Text>
            </Body>
            <Right />
        </Header>
        <View style={{padding:20,flexDirection:'row'}}>
          <View style={{flex:1}}>
            <Text>
              Range
            </Text>
          </View>
          <View style={{flex:1}}>
          <DropDownPicker
            items={[
                {label:'100', value: 100},
                {label:'200', value: 200},
                {label:'300', value: 300},
                {label:'400', value: 400},
                {label:'500', value: 500},
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
          <View style={{padding:20,}}>
            <Text style={{fontSize:20}}>
              Total Amount
            </Text>
          </View>
        </View>
        <View style={{alignSelf:'center',paddingBottom: 20}}>
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

export default SelectProviderScreen;