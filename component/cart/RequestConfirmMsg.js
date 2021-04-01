import React from 'react';
import { View} from 'react-native';
import {Button,Text} from 'native-base';


const RequestConfirmMsgScreen = ({navigation}) =>{

    return (
      <View style ={{flex:1,backgroundColor:'#F9D1A3'}}>
        <View style ={{flex:1,alignItems:'center', justifyContent:'center'}}>
          <Text style={{padding:20}}>
            Your request is sent to provider, you can go and purchase your commodities
          </Text>
          <Text style={{padding:20}}>
            Goto home screen
          </Text>
          <View style={{padding:20}}>
          <Button onPress ={() => navigation.navigate('Home')}>
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