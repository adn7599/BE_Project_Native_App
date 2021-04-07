import React,{useState,useContext} from 'react';
import { Card,CardItem,CheckBox, Left,Right,Body,Content, Header, Item, Input, Button, Text, Label} from 'native-base';
import { View,TextInput } from 'react-native';
import Context from '../../global/context';


const ShowCard = (item) => {
    var [SelectItem,setSelectItem] = useState('ADD');
    const [Quantity,setQuantity] = useState(1);
    const {changeTotal} = useContext(Context);
    var price

    function toggleCheck(){
      if (SelectItem == 'ADD'){
        setSelectItem('REMOVE')
        price = (item.price*Quantity)
        changeTotal(price);
      }
      else{
        setSelectItem('ADD')
        price = -(item.price*Quantity)
        changeTotal(price);
      }
    }

    function decrement(){
        if (Quantity != 1 && SelectItem == 'REMOVE'){
            setQuantity(prevQuantity => prevQuantity - 1);
            price = -(item.price)
            changeTotal(price);
        }
    }

    function increment(){
        if (SelectItem == 'REMOVE'){
            setQuantity(prevQuantity => prevQuantity + 1);
            price = (item.price)
            changeTotal(price);
        }
        
    }

    const CalculateAmount = () =>{
        return(
            item.price*Quantity
        )
    }
    
    return(
    <Content style={{ paddingHorizontal: 20 }}>
      <Card style={{ flex: 0 }}>
        <CardItem>
          <Body>
            <View style={{flex:1 ,flexDirection:'row',paddingBottom:10}}>
              <View style={{flex:1}}>
                <Text style={{fontSize:20}}>{item.title}</Text>
              </View>
              <View style={{flex:1 ,flexDirection:'row-reverse'}}>
                <Button onPress={() => toggleCheck()} style={{width:90}}>
                  <Text style={{textAlign:'center'}}>
                    {SelectItem}
                  </Text>
                </Button>
              </View>
            </View>
            <View style={{flex:1 ,flexDirection:'row',paddingBottom:10}}>
              <View style={{flex:1}}> 
                <Text note style={{fontSize:20}}>{item.price} Rs/{item.unit}</Text>
              </View>
              <View style={{flex:1,flexDirection:'row',}}>
                  <View style={{flex:1,paddingLeft:40}}>
                    <Button style={{width:40,height:40}} onPress={() => decrement()}>
                    <Text>-</Text>
                    </Button>
                  </View>
                  <View style={{flex:1}}>
                    <TextInput
                        value = {Quantity.toString()}
                        textAlign = 'center'
                        editable = {false}
                        style ={{width:40,height:40,borderWidth:1,color:'black'}}
                    />
                  </View>
                  <View style={{flex:1,alignItems:'flex-end',}}>
                    <Button style={{width:40,height:40}} onPress={() => increment()}>
                    <Text>+</Text>
                    </Button>
                  </View>
                </View>
            </View>
            <View style={{flex:1 ,flexDirection:'row',paddingBottom:10}}>
              <View style={{flex:1}}>
                <Text style={{fontSize:20}}>Amount</Text>
              </View>
              <View style={{flex:1 ,alignItems:'flex-end',paddingHorizontal:10}}>
                <Text>
                    <CalculateAmount />
                </Text>
              </View>
            </View>
            <View style={{flex:1,alignSelf:'flex-end'}}>
              <Button>
                <Text>
                  Delete Item
                </Text>
              </Button>
            </View>
          </Body>
        </CardItem>
      </Card>
    </Content> 
    );
}

export default ShowCard;