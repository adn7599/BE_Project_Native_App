import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ProviderDashboardScreen from '../Screens/Provider';
import RequestDetailScreen from '../Screens/Provider/RequestDetails';
import QRScannerScreen from '../Screens/Provider/QRScanner';

const Stack = createStackNavigator();

const StartStack = () => {
  return (
    <Stack.Navigator initialRouteName="ProviderDashboard">
      <Stack.Screen
        name="ProviderDashboard"
        component={ProviderDashboardScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RequestDetail"
        component={RequestDetailScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="QRScanner"
        component={QRScannerScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default StartStack;
