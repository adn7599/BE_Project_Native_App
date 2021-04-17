import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './Screens/SplashScreen';
import IdentificationScreen from './Screens/IdentificationScreen';
import OTPInputScreen from './Screens/OTPInputScreen';
// import LoginForm from './Screens/LoginForm';
// import TestScreen from './Screens/TestScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="IdentificationScreen"
          component={IdentificationScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OTPInputScreen"
          component={OTPInputScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
