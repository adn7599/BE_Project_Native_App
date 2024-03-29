import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import CancelledOrdersScreen from '../../../Screens/Requester/OrderHistory/CancelledOrders/CancelledOrders';
import CancelledOrderDetailsScreen from '../../../Screens/Requester/OrderHistory/CancelledOrders/CancelledOrderDetails';
import RaiseComplaintScreen from '../../../Screens/Requester/Complaints/PlaceComplaints';

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
      <Stack.Screen
          name="RaiseComplaint"
          component={RaiseComplaintScreen}
          options={{
            headerShown: false,
          }}
        />
    </Stack.Navigator>
  );
};

export default ConfirmedOrderHistoryStack;
