import React, {useRef, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Provider as PaperProvider} from 'react-native-paper';

import useUserCred, {UserCredentials} from './UserCredentials';

import StartStack from './Navigations/startStack';
import MyProfileStack from './Navigations/MyProfileStack';
import RequesterDashboardStack from './Navigations/Requester/RequesterDashboardStack';
import ProviderDashboardStack from './Navigations/Provider/ProviderDashboardStack';
import RequesterConfirmStack from './Navigations/Requester/YourOrders/YourConfirmStack';
import RequesterPaymentStack from './Navigations/Requester/YourOrders/YourPaymentStack';
import RequesterConfirmedOrderHistoryStack from './Navigations/Requester/OrderHistory/ConfirmedOrderHistoryStack';
import RequesterCancelledOrderHistoryStack from './Navigations/Requester/OrderHistory/CancelledOrderHistoryStack';
import SideDrawerContent from './Navigations/SideDrawerContent';
import ProviderStockScreen from './Screens/Provider/stock';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
//const Tab = createMaterialBottomTabNavigator();

const DrawerNavigation = () => {
  const {userCred} = useUserCred();

  const initialRoute =
    userCred.role === 'customer' ? 'RequesterDashboard' : 'ProviderDashboard';
  return (
    <Drawer.Navigator
      initialRouteName={initialRoute}
      drawerContent={(props) => <SideDrawerContent {...props} />}>
      <Drawer.Screen name="MyProfile" component={MyProfileStack} />
      <Drawer.Screen
        name="RequesterDashboard"
        component={RequesterDashboardStack}
      />
      <Drawer.Screen
        name="ProviderDashboard"
        component={ProviderDashboardStack}
      />
      <Drawer.Screen
        name="ProviderStock"
        component={ProviderStockScreen}
      />
      <Drawer.Screen
        name="RequesterPayment"
        component={RequesterPaymentStack}
      />
      <Drawer.Screen
        name="RequesterConfirm"
        component={RequesterConfirmStack}
      />
      <Drawer.Screen
        name="RequesterConfirmedOrderHistory"
        component={RequesterConfirmedOrderHistoryStack}
      />
      <Drawer.Screen
        name="RequesterCancelledOrderHistory"
        component={RequesterCancelledOrderHistoryStack}
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
