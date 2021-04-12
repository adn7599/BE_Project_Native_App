import React,{useState,useContext} from 'react';
import { 
    Card,CardItem,Body,
    Content,Button, Text,}
    from 'native-base';
import { View,TextInput,StyleSheet } from 'react-native';

import Context from '../Global/context';
import common from '../Global/stylesheet';

const ShowCard = (item) => {
    const [SelectItem,setSelectItem] = useState('ADD');
    const [Quantity,setQuantity] = useState(1);
    const {changeTotal} = useContext(Context);
    let price

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
        <Content style={common.cardContainer}>
            <Card style={common.card}>
                <CardItem>
                    <Body>
                        <View style={common.cardRow}>
                            <View style={common.flexOne}>
                                <Text style={common.text}>{item.title}</Text>
                            </View>
                            <View style={common.cardRowEnd}>
                                <Button onPress={() => toggleCheck()} style={{width:90}}>
                                    <Text style={Styles.btnText}>
                                        {SelectItem}
                                    </Text>
                                </Button>
                            </View>
                        </View>
                        <View style={common.cardRow}>
                            <View style={common.flexOne}> 
                                <Text note style={common.text}>{item.price} Rs/{item.unit}</Text>
                            </View>
                            <View style={common.cardRowEnd}>
                                <View style={common.flexOne}>
                                    <Button style={Styles.incDceBtn} onPress={() => increment()}>
                                        <Text>+</Text>
                                    </Button>
                                </View>
                                <View style={common.flexOne}>
                                    <TextInput
                                        value = {Quantity.toString()}
                                        textAlign = 'center'
                                        editable = {SelectItem === 'REMOVE' ? true : false}
                                        onChangeText ={Text => setQuantity(Text)}
                                        style ={Styles.quantityText}
                                    />
                                </View>
                                <View style={Styles.decView}>
                                    <Button style={Styles.incDceBtn} onPress={() => decrement()}>
                                        <Text>-</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                        <View style={common.cardRow}>
                            <View style={common.flexOne}>
                                <Text style={common.text}>Amount</Text>
                            </View>
                            <View style={Styles.itemAmount}>
                                <Text>
                                    <CalculateAmount />
                                </Text>
                            </View>
                        </View>
                        <View style={common.rightcornerBtn}>
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

const Styles = StyleSheet.create({
    btnText : {
        textAlign:'center',
    },
    decView : {
        flex:1,
        paddingLeft:40,
    },
    incDceBtn : {
        width:40,
        height:40,
    },
    quantityText : {
        width:40,
        height:40,
        borderWidth:1,
        color:'black',
    },
    itemAmount : {
        flex:1 ,
        alignItems:'flex-end',
        paddingStart : 10,
    },
})

export default ShowCard;