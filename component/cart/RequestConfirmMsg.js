import React,{useContext,useEffect} from 'react';
import { View,BackHandler} from 'react-native';
import {Button,Text} from 'native-base';
import Context from '../../global/context';


const RequestConfirmMsgScreen = ({navigation}) =>{
  const {TotalAmount,changeTotal} = useContext(Context);

  useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

    return (
      <View style ={{flex:1,backgroundColor:'#F9D1A3'}}>
        <View style ={{flex:1,alignItems:'center', justifyContent:'center'}}>
          <Text style={{paddingHorizontal:10,textAlign:'center',fontSize:20}}>
            Your request is sent to provider, you can go and purchase your commodities
          </Text>
          <Text style={{padding:20}}>
            Goto home screen
          </Text>
          <View style={{padding:20}}>
          <Button onPress ={() => [changeTotal(-(TotalAmount)),navigation.navigate('Home')]}>
            <Text>
              Home
            </Text>
          </Button>
          </View>
        </View>
      </View>
    );
}

export default RequestConfirmMsgScreen;