import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LoginOrRegister from '../Screens/StartScreens/LoginOrRegister';
import WhoAreYou from '../Screens/StartScreens/WhoAreYou';
import LoginForm from '../Screens/StartScreens/Login/LoginForm';
import IdentificationScreen from '../Screens/StartScreens/Register/IdentificationScreen';
import OTPInputScreen from '../Screens/StartScreens/Register/OTPInputScreen';
import SetPasswordScreen from '../Screens/StartScreens/Register/SetPassword'

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
      <Stack.Screen
        name="IdentificationScreen"
        component={IdentificationScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="OTPInputScreen"
        component={OTPInputScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SetPasswordScreen"
        component={SetPasswordScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default StartStack;
