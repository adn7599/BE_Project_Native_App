import React, {useRef, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Icon} from 'native-base';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Provider as PaperProvider} from 'react-native-paper';

import SideDrawerContent from './SideDrawerContent';
import Context from './Global/context';
import GlobalVariable from './Global/GlobalVariable';
import SplashScreen from './Screens/SplashScreen';

import ProfileScreen from './Screens/Profile';
import QuotaScreen from './Screens/Quota';
import OrderScreen from './Screens/YourOrder';
import ConfirmOrderScreen from './Screens/YourOrder/ConfirmTab';
import PaymentOrderScreen from './Screens/YourOrder/PaymentTab';
import OrderDetailScreen from './Screens/YourOrder/OrderDetails';
import UPIPaymentScreen from './Screens/YourOrder/upiPayment';
import ConfirmationQRScreen from './Screens/YourOrder/ConfirmationQR';

import StartStack from './Navigations/startStack';
import CartStack from './Navigations/CartStack';
//console.reportErrorAsExceptions = false;

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();

const DrawerNavigation = () => {


  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="CustomerDashboard"
        drawerContent={(props) => <SideDrawerContent {...props} />}>
        <Drawer.Screen
          name="CustomerDashboard"
          component={WhichStack}
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
          name="YourOrder"
          component={YourOrderStack}
          options={{
            swipeEnabled: false,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
/*
const YourOrderTab = () => {
  return (
    <Tab.Navigator initialRouteName={'Payment'}>
      <Tab.Screen name="Payment" component={YourPaymentStack} />
      <Tab.Screen name="Confirm" component={YourConfirmStack} />
    </Tab.Navigator>
  );
};
*/
const YourConfirmStack = () => {
  return (
    <Stack.Navigator initialRouteName="YourOrder">
      <Stack.Screen
        name="YourOrder"
        component={ConfirmOrderScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="OrderDetails"
        component={OrderDetailScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ConfirmationQR"
        component={ConfirmationQRScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const YourPaymentStack = () => {
  return (
    <Stack.Navigator initialRouteName="YourOrder">
      <Stack.Screen
        name="YourOrder"
        component={PaymentOrderScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="OrderDetails"
        component={OrderDetailScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UPIPayment"
        component={UPIPaymentScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const YourOrderStack = () => {
  return (
    <Stack.Navigator initialRouteName="YourOrder">
      <Stack.Screen
        name="YourOrder"
        component={OrderScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PaymentOrder"
        component={PaymentOrderScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ConfirmOrder"
        component={ConfirmOrderScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="OrderDetails"
        component={OrderDetailScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UPIPayment"
        component={UPIPaymentScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ConfirmationQR"
        component={ConfirmationQRScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const WhichStack = () => {
  const {UserType} = useContext(Context);
  if (UserType == '') {
    return <StartStack />;
  } else {
    return <CartStack />;
  }
  /*return(
    <StartStack />
  )*/
};

const App = () => {
  const globalVariable = GlobalVariable();

  return (
    <Context.Provider value={globalVariable}>
      <PaperProvider>
        <DrawerNavigation />
      </PaperProvider>
    </Context.Provider>
  );
};

export default App;
