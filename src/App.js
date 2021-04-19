import React, {useRef, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Provider as PaperProvider} from 'react-native-paper';

import Context from './Global/context';
import GlobalVariable from './Global/GlobalVariable';
import useUserCred, {UserCredentials} from './UserCredentials';

import ProfileScreen from './Screens/Profile';
import QuotaScreen from './Screens/Quota';

import StartStack from './Navigations/startStack';
import HomeStack from './Navigations/CartStack';
import YourConfirmStack from './Navigations/YourConfirmStack';
import YourPaymentStack from './Navigations/YourPaymentStack';
import SideDrawerContent from './Navigations/SideDrawerContent';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
//const Tab = createMaterialBottomTabNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName="CustomerDashboard"
      drawerContent={(props) => <SideDrawerContent {...props} />}>
      <Drawer.Screen
        name="CustomerDashboard"
        component={HomeStack}
        options={{
          swipeEnabled: false,
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          swipeEnabled: false,
        }}
      />
      <Drawer.Screen
        name="Quota"
        component={QuotaScreen}
        options={{
          swipeEnabled: false,
        }}
      />
      <Drawer.Screen
        name="PaymentOrder"
        component={YourPaymentStack}
        options={{
          swipeEnabled: false,
        }}
      />
      <Drawer.Screen
        name="ConfirmOrder"
        component={YourConfirmStack}
        options={{
          swipeEnabled: false,
        }}
      />
    </Drawer.Navigator>
  );
};

const WhichStack = () => {
  //const {UserType} = useContext(Context);
  const {userCred, userDetails} = useUserCred();

  console.log('{which}User logged in: ', userCred);
  console.log('{which}User Details : ', userDetails);
  if (userCred === null) {
    return <StartStack />;
  } else {
    return <DrawerNavigation />;
  }
};

const App = () => {
  return (
    <UserCredentials>
      <PaperProvider>
        <NavigationContainer>
          <WhichStack />
        </NavigationContainer>
      </PaperProvider>
    </UserCredentials>
  );
};

export default App;
