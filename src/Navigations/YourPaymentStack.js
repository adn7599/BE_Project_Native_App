import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import PaymentOrderScreen from '../Screens/YourOrder/PaymentTab';
import OrderDetailScreen from '../Screens/YourOrder/OrderDetails';
import UPIPaymentScreen from '../Screens/YourOrder/upiPayment';

const Stack = createStackNavigator();

const YourPaymentStack = () => {
    return (
      <Stack.Navigator initialRouteName="YourOrder">
        <Stack.Screen
          name="YourOrder"
          component={PaymentOrderScreen}
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
          name="UPIPayment"
          component={UPIPaymentScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  };

export default YourPaymentStack;
  