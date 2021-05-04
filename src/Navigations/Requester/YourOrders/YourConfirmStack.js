import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ConfirmOrderScreen from '../../../Screens/Requester/YourOrder/Confirmation/ConfirmOrders';
import ConfirmationQRScreen from '../../../Screens/Requester/YourOrder/Confirmation/ConfirmationQR';
import ConfirmOrderDetailsScreen from '../../../Screens/Requester/YourOrder/Confirmation/ConfirmOrderDetails';

const Stack = createStackNavigator();

const YourConfirmStack = () => {
    return (
      <Stack.Navigator initialRouteName="ConfirmOrder">
        <Stack.Screen
          name="ConfirmOrder"
          component={ConfirmOrderScreen}
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