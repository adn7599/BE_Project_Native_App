import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ConfirmOrderScreen from '../Screens/YourOrder/ConfirmTab';
import OrderDetailScreen from '../Screens/YourOrder/OrderDetails';
import ConfirmationQRScreen from '../Screens/YourOrder/ConfirmationQR';
import ConfirmOrderDetailsScreen from '../Screens/YourOrder/ConfirmOrderDetails';

const Stack = createStackNavigator();

const YourConfirmStack = () => {
    return (
      <Stack.Navigator initialRouteName="YourOrder">
        <Stack.Screen
          name="YourOrder"
          component={ConfirmOrderScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="OrderDetails"
          component={OrderDetailScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ConfirmOrderDetails"
          component={ConfirmOrderDetailsScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ConfirmationQR"
          component={ConfirmationQRScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  };
 
export default YourConfirmStack;