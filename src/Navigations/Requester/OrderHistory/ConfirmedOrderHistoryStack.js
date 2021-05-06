import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ConfirmedOrdersScreen from '../../../Screens/Requester/OrderHistory/ConfirmedOrders/ConfirmedOrders';
import ConfirmedOrderDetailsScreen from '../../../Screens/Requester/OrderHistory/ConfirmedOrders/ConfirmedOrderDetails';
import RaiseComplaintScreen from '../../../Screens/Requester/Complaints/PlaceComplaints';

const Stack = createStackNavigator();

const ConfirmedOrderHistoryStack = () => {
  return (
    <Stack.Navigator initialRouteName = 'ConfirmedOrders'>
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
