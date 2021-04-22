import React, {useRef, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Provider as PaperProvider} from 'react-native-paper';

import useUserCred, {UserCredentials} from './UserCredentials';

import StartStack from './Navigations/startStack';
import MyProfileStack from './Navigations/MyProfileStack';
import HomeStack from './Navigations/CartStack';
import YourConfirmStack from './Navigations/YourConfirmStack';
import YourPaymentStack from './Navigations/YourPaymentStack';
import ConfirmedOrderHistoryStack from './Navigations/ConfirmedOrderHistoryStack';
import CancelledOrderHistoryStack from './Navigations/CancelledOrderHistoryStack';
import SideDrawerContent from './Navigations/SideDrawerContent';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
//const Tab = createMaterialBottomTabNavigator();

const DrawerNavigation = () => {
  const {userCred} = useUserCred();

  const initialRoute =
    userCred.role === 'customer' ? 'CustomerDashboard' : 'ProviderDashboard';
  return (
    <Drawer.Navigator
      initialRouteName={initialRoute}
      drawerContent={(props) => <SideDrawerContent {...props} />}>
      <Drawer.Screen
        name="CustomerDashboard"
        component={HomeStack}
        options={{
          swipeEnabled: false,
        }}
      />
      <Drawer.Screen
        name="ProviderDashboard"
        component={HomeStack}
        options={{
          swipeEnabled: false,
        }}
      />
      <Drawer.Screen
        name="MyProfile"
        component={MyProfileStack}
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
      <Drawer.Screen
        name="ConfirmedOrderHistory"
        component={ConfirmedOrderHistoryStack}
        options={{
          swipeEnabled: false,
        }}
      />
      <Drawer.Screen
        name="CancelledOrderHistory"
        component={CancelledOrderHistoryStack}
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
