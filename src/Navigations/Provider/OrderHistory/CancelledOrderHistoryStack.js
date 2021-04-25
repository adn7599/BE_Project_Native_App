import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import CancelledOrdersScreen from '../Screens/Order History/CancelledOrders/CancelledOrders';
import CancelledOrderDetailsScreen from '../Screens/Order History/CancelledOrders/CancelledOrderDetails';

const Stack = createStackNavigator();

const ConfirmedOrderHistoryStack = () => {
  return (
    <Stack.Navigator initialRouteName = 'CancelledOrders'>
      <Stack.Screen
        name="CancelledOrders"
        component={CancelledOrdersScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CancelledOrderDetails"
        component={CancelledOrderDetailsScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default ConfirmedOrderHistoryStack;
