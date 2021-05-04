import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import PaymentOrderScreen from '../../../Screens/Requester/YourOrder/Payment/PaymentOrders';
import PaymentOrderDetailScreen from '../../../Screens/Requester/YourOrder/Payment/PaymentOrderDetails';
import UPIPaymentScreen from '../../../Screens/Requester/YourOrder/Payment/upiPayment';

const Stack = createStackNavigator();

const YourPaymentStack = () => {
    return (
      <Stack.Navigator 
      initialRouteName='PaymentOrder'
      >
        <Stack.Screen
          name="PaymentOrder"
          component={PaymentOrderScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PaymentOrderDetail"
          component={PaymentOrderDetailScreen}
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
  