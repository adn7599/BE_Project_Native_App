import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LoginOrRegister from '../Screens/LoginOrRegister';
import WhoAreYou from '../Screens/WhoAreYou';
import LoginForm from '../Screens/LoginForm';

const Stack = createStackNavigator();

const StartStack = () => {
  return (
    <Stack.Navigator initialRouteName="LoginOrRegister">
      <Stack.Screen
        name="LoginOrRegister"
        component={LoginOrRegister}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="WhoAreYou"
        component={WhoAreYou}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LoginForm"
        component={LoginForm}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default StartStack;
