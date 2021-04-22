import React, {useState, useEffect} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {
  DrawerContent,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {Icon, Text, Title} from 'native-base';
import {Avatar, Drawer, List} from 'react-native-paper';
import common from '../Global/stylesheet';

import useUserCred from '../UserCredentials';

const roleTitle = {
  customer: 'Customer',
  SP: 'Supplier',
  DA: 'Distributor',
};

const SideDrawerContent = (props) => {
  const {userCred, userDetails, deleteUserCred} = useUserCred();
  const [expanded, setExpanded] = useState(null);
  /*
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('blur', () => {
      console.log('Drawer screen focused');
      setExpanded(null)
    });
    return unsubscribe;
  }, []);*/

  const FirstSideBarTitle = () => {
    if (userCred.role === 'customer') {
      return (
        <DrawerItem
          label="Home"
          onPress={() => props.navigation.navigate('Home')}
        />
      );
    } else if (userCred.role === 'SP') {
      return (
        <>
          <DrawerItem
            label="Home"
            onPress={() => props.navigation.navigate('Home')}
          />
          <DrawerItem
            label="Request Commodities"
            onPress={() => props.navigation.navigate('Home')}
          />
        </>
      );
    } else {
      return (
        <DrawerItem
          label="Home"
          onPress={() => props.navigation.navigate('Home')}
        />
      );
    }
  };

  const avatarText =
    userCred.role === 'customer'
      ? userDetails.fName[0] + userDetails.lName[0]
      : userDetails.name.subString(0, 2).toUpperCase();

  const name =
    userCred.role === 'customer'
      ? userDetails.fName + ' ' + userDetails.lName
      : userDetails.name;

  return (
    <View style={common.flexOne}>
      <DrawerContentScrollView {...props}>
        <View style={common.flexOne}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Profile',{
              avatarText : avatarText,
              name : name
            })}>
            <View
              style={{paddingLeft: 20, flexDirection: 'row', marginTop: 20}}>
              <Avatar.Text size={70} label={avatarText} />
              <View style={{margin: 15}}>
                <Text>{name}</Text>
                <Text note>{userDetails._id}</Text>
                <Text note>{roleTitle[userCred.role]}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <Drawer.Section style={{marginTop: 15}}>
            <FirstSideBarTitle />
            <List.Accordion
              title="Your Order"
              expanded={expanded === 'yourorder'}
              onPress={() => setExpanded('yourorder')}>
              <List.Item
                title="Payment"
                onPress={() => {
                  setExpanded(null);
                  props.navigation.navigate('PaymentOrder');
                }}
              />
              <List.Item
                title="Confirm"
                onPress={() => {
                  setExpanded(null);
                  props.navigation.navigate('ConfirmOrder');
                }}
              />
            </List.Accordion>
            <List.Accordion
              title="Order History"
              expanded={expanded === 'orderhistory'}
              onPress={() => setExpanded('orderhistory')}>
              <List.Item
                title="completed"
                onPress={() =>
                  props.navigation.navigate('ConfirmedOrderHistory')
                }
              />
              <List.Item
                title="Cancel"
                onPress={() =>
                  props.navigation.navigate('CancelledOrderHistory')
                }
              />
            </List.Accordion>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="md-exit-outline" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => deleteUserCred()}
        />
      </Drawer.Section>
    </View>
  );
};

export default SideDrawerContent;
