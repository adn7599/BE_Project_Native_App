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
    <Stack.Navigator initialRouteName = 'RequesterDashboard' >
      <Stack.Screen
        name="RequesterDashboard"
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
