import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import RequesterDashboardScreen from '../../Screens/Requester';
import CartScreen from '../../Screens/Requester/Cart';
import SelectProviderScreen from '../../Screens/Requester/Cart/SelectProvider';
import RequestConfirmMsgScreen from '../../Screens/Requester/Cart/RequestConfirmMsg';
import useUserCred from '../../UserCredentials';

const Stack = createStackNavigator();

const HomeStack = () => {

  const {userCred} = useUserCred();


  return (
    <Stack.Navigator initialRouteName = 'RequesterHome' >
      <Stack.Screen
        name="RequesterHome"
        component={RequesterDashboardScreen}
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
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RequestConfirmMsg"
        component={RequestConfirmMsgScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
