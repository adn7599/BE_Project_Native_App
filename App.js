import React,{ useRef } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Icon} from 'native-base';
import { createStackNavigator, HeaderBackButton,} from '@react-navigation/stack';
import { createDrawerNavigator,} from '@react-navigation/drawer';
import { Provider as PaperProvider } from 'react-native-paper';

import Context from './global/context';
import CartArray from './global/globalCartArray';
import HomeScreen from './component/home';
import CartScreen from './component/cart';
import SelectProviderScreen from './component/cart/SelectProvider';
import RequestConfirmMsgScreen from './component/cart/RequestConfirmMsg';
import ProfileScreen from './component/profile';
import QuotaScreen from './component/commoditiesQuota';
import OrderScreen from './component/yourOrder';
import OrderDetailScreen from './component/yourOrder/orderDetails';
import UPIPaymentScreen from './component/yourOrder/upiPayment';
import CashPaymentScreen from './component/yourOrder/cashPayment';
import ConfirmationQRScreen from './component/yourOrder/confirmationQR';


//console.reportErrorAsExceptions = false;


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen 
          name="Home" 
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
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
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