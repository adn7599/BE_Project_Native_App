import React,{useState} from 'react';
import { Card,CardItem,CheckBox, Left,Right,Body,Content, Header, Item, Input, Button, Text, Label} from 'native-base';
import { View,TextInput } from 'react-native';



const ShowCard = (item) => {
    var [SelectItem,setSelectItem] = useState('ADD');
    const [Quantity,setQuantity] = useState(1);
    //var [Order,setOrder] = useState([]);
    //var [Amount,setAmount] = useState(0);

    function toggleCheck(){
      if (SelectItem == 'ADD'){
        setSelectItem('REMOVE')
        /*array = Order
        console.log(typeof(array))
        console.log(array)
        index = array.indexOf(item)
        array.splice(index,1)
        console.log(typeof(Order))
        setOrder(Order = array)
        console.log(Order)*/
      }
      else{
        setSelectItem('ADD')
        /*array = Order

        console.log(typeof(array))
        console.log(array)
        array.push(item)
        setOrder(Order = array)
        console.log(Order)
        console.log(typeof(item))
        */
      }
    }

    function decrement(){
        if (Quantity != 1 && SelectItem == 'REMOVE'){
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    }

    function increment(){
        if (SelectItem == 'REMOVE'){
            setQuantity(prevQuantity => prevQuantity + 1);
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
              <View style={{flex:1 ,paddingLeft:135}}>
                <Button onPress={() => toggleCheck()} style={{width:90,alignSelf:'center'}}>
                  <Text >
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
            <View style={{flex:1 ,flexDirection:'row'}}>
              <View style={{flex:1}}>
                <Text style={{fontSize:20}}>Amount</Text>
              </View>
              <View style={{flex:1 ,alignItems:'flex-end',paddingHorizontal:10}}>
                <Text>
                    <CalculateAmount />
                </Text>
              </View>
            </View>
          </Body>
        </CardItem>
      </Card>
    </Content> 
    );
}

export default ShowCard;