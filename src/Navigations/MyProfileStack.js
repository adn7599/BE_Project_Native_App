import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ProfileScreen from '../Screens/MyProfile/Profile';
import ChangePasswordScreen from '../Screens/MyProfile/ChangePassword';
import ComplaintHistoryScreen from '../Screens/Requester/Complaints/ComplaintHistory/ComplaintHistory';
import ComplaintHistoryDetailsScreen from '../Screens/Requester/Complaints/ComplaintHistory/ComplaintHistoryDetails';

import {createContext} from 'react';

export const myProfileContext = createContext();
const Stack = createStackNavigator();

const MyProfileStack = ({route, navigation}) => {
  const {avatarText, name} = route.params;
  return (
    <myProfileContext.Provider value={{avatarText, name}}>
      <Stack.Navigator initialRouteName="Profile">
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePasswordScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ComplaintHistory"
          component={ComplaintHistoryScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ComplaintHistoryDetails"
          component={ComplaintHistoryDetailsScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </myProfileContext.Provider>
  );
};

export default MyProfileStack;
