import React,{ useRef,useContext } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Icon} from 'native-base';
import { createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator,} from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';

import Context from './Global/context';
import GlobalVariable from './Global/GlobalVariable';
import SplashScreen from './Screens/SplashScreen';
import LoginOrRegister from './Screens/LoginOrRegister';
import WhoAreYou from './Screens/WhoAreYou';
import LoginForm from './Screens/LoginForm';
import CustomerDashboardScreen from './Screens/Customer';
import CartScreen from './Screens/Customer/Cart';
import SelectProviderScreen from './Screens/Customer/Cart/SelectProvider';
import RequestConfirmMsgScreen from './Screens/Customer/Cart/RequestConfirmMsg';
import ProfileScreen from './Screens/Profile';
import QuotaScreen from './Screens/Quota';
import ConfirmOrderScreen from './Screens/YourOrder/ConfirmTab';
import PaymentOrderScreen from './Screens/YourOrder/PaymentTab';
import OrderDetailScreen from './Screens/YourOrder/OrderDetails';
import UPIPaymentScreen from './Screens/YourOrder/upiPayment';
import ConfirmationQRScreen from './Screens/YourOrder/ConfirmationQR';


//console.reportErrorAsExceptions = false;


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const DrawerNavigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="CustomerDashboard">
        <Drawer.Screen 
          name="CustomerDashboard" 
          component={WhichStack} 
          options = {{
            swipeEnabled : false
          }}
        />
        <Drawer.Screen 
        name='Profile' 
        component ={ProfileScreen} 
        options = {{
          swipeEnabled : false
        }}
        />
        <Drawer.Screen 
        name ='Quota' 
        component ={QuotaScreen} 
        options = {{
          swipeEnabled : false
        }}
        />
        <Drawer.Screen 
        name = 'YourOrder' 
        component ={YourOrderTab}
        options = {{
          swipeEnabled : false
        }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const YourOrderTab = () => {
  return(
    <Tab.Navigator tabBarOptions ={{labelStyle : {fontSize : 15 , paddingBottom : 10}}}>
      <Tab.Screen 
      name = 'Payment'
      component = {YourPaymentStack}
      options = {{
        title : 'Payment',
        //tabBarVisible : false
      }}
      />
    <Tab.Screen 
      name = 'Confirm'
      component = {YourConfirmStack}
      />
    </Tab.Navigator>
  )
}

const YourConfirmStack = () => {
  return(
    <Stack.Navigator initialRouteName='YourOrder'>
    <Stack.Screen 
    name = 'YourOrder'
    component = {ConfirmOrderScreen}
    options={{
      headerShown : false,
      
    }}
    />
    <Stack.Screen 
    name = 'OrderDetails' 
    component ={OrderDetailScreen}
    options={{
      headerShown : false,
    }}
    />
    <Stack.Screen 
    name = 'UPIPayment'
    component ={UPIPaymentScreen}
    options={{
      headerShown : false
    }}
    />
  </Stack.Navigator>
  )
}

const YourPaymentStack = () => {
  return(
    <Stack.Navigator initialRouteName='YourOrder'>
    <Stack.Screen 
    name = 'YourOrder'
    component = {PaymentOrderScreen}
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
    name = 'ConfirmationQR'
    component ={ConfirmationQRScreen}
    options={{
      headerShown : false
    }}
    />
  </Stack.Navigator>
  )
}

const CartStack = () =>{
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

const StartStack = () => {
  return (
    
      <Stack.Navigator initialRouteName ='LoginOrRegister'>
        <Stack.Screen 
        name = 'LoginOrRegister'
        component ={LoginOrRegister}
        options = {{
          headerShown : false
        }} />
        <Stack.Screen 
        name = 'WhoAreYou'
        component ={WhoAreYou}
        options = {{
          headerShown : false
        }} />
        <Stack.Screen 
        name = 'LoginForm'
        component ={LoginForm}
        options = {{
          headerShown : false
        }} />
        <Stack.Screen 
        name = 'CustomerDashboard'
        component ={CartStack}
        />
      </Stack.Navigator>
    
  )
}

const WhichStack = () =>{
  const {UserType} = useContext(Context);
  if (UserType == ''){
    return (
    <StartStack />
    )
  }
  else{
    return (
    <CartStack />
    )
  }
  /*return(
    <StartStack />
  )*/
}

const App = () =>{
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