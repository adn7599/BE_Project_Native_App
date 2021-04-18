import React,{useContext,useEffect} from 'react';
import { View,BackHandler,StyleSheet} from 'react-native';
import {Button,Text} from 'native-base';


import Context from '../../../Global/context';
import common from '../../../Global/stylesheet';



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
      <View style ={[common.container,common.flexOne]}>
        <View style ={Styles.textView}>
          <Text style={Styles.text}>
            Your request is sent to provider, you can go and purchase your commodities
          </Text>
          <Text style={common.topBottomSep}>
            Goto home screen
          </Text>
          <View style={common.topBottomSep}>
          <Button 
          onPress ={
            () => [changeTotal(-(TotalAmount)),navigation.navigate('Home')]
            }>
            <Text>
              Home
            </Text>
          </Button>
          </View>
        </View>
      </View>
    );
}

const Styles = StyleSheet.create({
  textView : {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  text : {
    paddingHorizontal:10,
    textAlign:'center',
    fontSize:20,
  },
})

export default RequestConfirmMsgScreen;