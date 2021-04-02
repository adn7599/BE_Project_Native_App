import React,{ useRef } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Icon} from 'native-base';
import { createStackNavigator, HeaderBackButton,} from '@react-navigation/stack';
import { createDrawerNavigator,} from '@react-navigation/drawer';
import { Provider as PaperProvider } from 'react-native-paper';

//import DrawerNavigationView from './DrawerNavigationView';
import Context from './global/context';
import CartArray from './global/globalCartArray';
import HomeScreen from './component/home';
import CartScreen from './component/cart';
import SelectProviderScreen from './component/cart/SelectProvider';
import RequestConfirmMsgScreen from './component/cart/RequestConfirmMsg';

//import {DrawerLayoutAndroid} from "react-native";


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={StackNavigation} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
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