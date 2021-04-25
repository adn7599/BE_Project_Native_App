import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ConfirmedOrdersScreen from '../../../Screens/Provider/OrderHistory/ConfirmedOrders/ConfirmedOrders';
import ConfirmedOrderDetailsScreen from '../../../Screens/Provider/OrderHistory/ConfirmedOrders/ConfirmedOrderDetails';

const Stack = createStackNavigator();

const ConfirmedOrderHistoryStack = () => {
  return (
    <Stack.Navigator initialRouteName="ConfirmedOrders">
      <Stack.Screen
        name="ConfirmedOrders"
        component={ConfirmedOrdersScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ConfirmedOrderDetails"
        component={ConfirmedOrderDetailsScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default ConfirmedOrderHistoryStack;
