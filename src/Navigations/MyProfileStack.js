import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ProfileScreen from '../Screens/MyProfile/Profile';
import ChangePasswordScreen from '../Screens/MyProfile/ChangePassword';
import RaiseComplaintScreen from '../Screens/Requester/Complaints/PlaceComplaints';
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
        
      </Stack.Navigator>
    </myProfileContext.Provider>
  );
};

export default MyProfileStack;
