import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ProviderDashboardScreen from '../../Screens/Provider/DashBoard';
import RequestDetailScreen from '../../Screens/Provider/DashBoard/RequestDetails';
import QRScannerScreen from '../../Screens/Provider/DashBoard/QRScanner';

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
