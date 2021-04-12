import React,{ useRef } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Icon} from 'native-base';
import { createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator,} from '@react-navigation/drawer';
import { Provider as PaperProvider } from 'react-native-paper';

import Context from './Global/context';
import CartArray from './Global/GlobalVariable';
import CustomerDashboardScreen from './Screens/Customer';
import CartScreen from './Screens/Customer/Cart';
import SelectProviderScreen from './Screens/Customer/Cart/SelectProvider';
import RequestConfirmMsgScreen from './Screens/Customer/Cart/RequestConfirmMsg';
import ProfileScreen from './Screens/Profile';
import QuotaScreen from './Screens/Quota';
import OrderScreen from './Screens/YourOrder';
import OrderDetailScreen from './Screens/YourOrder/OrderDetails';
import UPIPaymentScreen from './Screens/YourOrder/upiPayment';
import CashPaymentScreen from './Screens/YourOrder/CashPayment';
import ConfirmationQRScreen from './Screens/YourOrder/ConfirmationQR';


//console.reportErrorAsExceptions = false;


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="CustomerDashboard">
        <Drawer.Screen 
          name="CustomerDashboard" 
          component={StackNavigation} 
        />
        <Drawer.Screen 
        name='Profile' 
        component ={ProfileScreen} 
        />
        <Drawer.Screen 
        name ='Quota' 
        component ={QuotaScreen} 
        />
        <Drawer.Screen 
        name = 'YourOrder' 
        component ={YourOrderStack}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const YourOrderStack = () => {
  return(
    <Stack.Navigator initialRouteName='YourOrder'>
    <Stack.Screen 
    name = 'YourOrder'
    component = {OrderScreen}
    options={{
      headerShown : false
    }}
    />
    <Stack.Screen 
    name = 'OrderDetails' 
    component ={OrderDetailScreen}
    options={{
      headerShown : false
    }}
    />
    <Stack.Screen 
    name = 'UPIPayment'
    component ={UPIPaymentScreen}
    options={{
      headerShown : false
    }}
    />
    <Stack.Screen 
    name = 'CashPayment'
    component ={CashPaymentScreen}
    options={{
      headerShown : false
    }}
    />
    <Stack.Screen 
    name = 'ConfirmationQR'
    component ={ConfirmationQRScreen}
    options={{
      headerShown : false
    }}
    />
  </Stack.Navigator>
  )
}

const StackNavigation = () =>{
  return(
      <Stack.Navigator initialRouteName="CustomerDashboard">
        <Stack.Screen
          name="CustomerDashboard"
          component={CustomerDashboardScreen}
          options={({ navigation }) => ({
            headerTitleAlign: 'center',
            //headerShown : false, 
            headerLeft: (props) => (
              <Icon
                {...props}
                onPress= {() => navigation.openDrawer()}
                name= "md-menu"
                style={{fontSize: 35, color: 'red', padding:20}}/>
            ),
            headerRight: (props) => (
              <Icon
                {...props}
                onPress= {() => navigation.navigate('Cart')}
                name= "cart"
                style={{fontSize: 35, color: 'red', padding:20}}/>
            ),
          })}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={({ navigation }) => ({
            headerTitleAlign: 'center',
            //headerShown : false, 
            headerLeft: (props) => (
              <Icon
                {...props}
                onPress= {() => navigation.openDrawer()}
                name= "md-menu"
                style={{fontSize: 35, color: 'red', padding:20}}/>
            ),
          })}
        />
        <Stack.Screen 
        name="SelectProvider"
        component={SelectProviderScreen}
        options ={{
          headerLeft:null
        }}
        />
        <Stack.Screen 
        name="RequestConfirmMsg"
        component={RequestConfirmMsgScreen}
        options ={{
          headerLeft:null
        }}
        />
        
      </Stack.Navigator>
  );
}

const App = () =>{
  const cartArray = CartArray();

  return (
    <Context.Provider value={cartArray}>
      <PaperProvider>
        <DrawerNavigation />
      </PaperProvider>
    </Context.Provider>
  );
};


export default App;