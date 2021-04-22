import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import CustomerDashboardScreen from '../Screens/Customer';
import CartScreen from '../Screens/Customer/Cart';
import SelectProviderScreen from '../Screens/Customer/Cart/SelectProvider';
import RequestConfirmMsgScreen from '../Screens/Customer/Cart/RequestConfirmMsg';
import ProviderDashboardScreen from '../Screens/Provider';
import useUserCred from '../UserCredentials';

const Stack = createStackNavigator();

const HomeStack = () => {

  const {userCred} = useUserCred();

  const initialRoute = userCred.role === 'customer' ? 'Home' : 'ProviderDashboard'


  return (
    <Stack.Navigator initialRouteName = {initialRoute} >
      <Stack.Screen 
      name = 'ProviderDashboard'
      component = {ProviderDashboardScreen}
      options={{
        headerShown: false,
      }}
      />
      <Stack.Screen
        name="Home"
        component={CustomerDashboardScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SelectProvider"
        component={SelectProviderScreen}
        options={{
          headerLeft: null,
        }}
      />
      <Stack.Screen
        name="RequestConfirmMsg"
        component={RequestConfirmMsgScreen}
        options={{
          headerLeft: null,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
