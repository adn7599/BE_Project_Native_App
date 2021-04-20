import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
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
  const avatarText = userDetails.fName[0] + userDetails.lName[0];
  /*
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('blur', () => {
      console.log('Drawer screen focused');
      setExpanded(null)
    });
    return unsubscribe;
  }, []);*/

  return (
    <View style={common.flexOne}>
      <DrawerContentScrollView {...props}>
        <View style={common.flexOne}>
          <View style={{paddingLeft: 20, flexDirection: 'row', marginTop: 20}}>
            <Avatar.Text size={70} label={avatarText} />
            <View style={{margin: 15}}>
              <Text>{`${userDetails.fName} ${userDetails.lName}`}</Text>
              <Text note>{userDetails._id}</Text>
              <Text note>{roleTitle[userCred.role]}</Text>
            </View>
          </View>
          <Drawer.Section style={{marginTop: 15}}>
            <DrawerItem
              label="Home"
              onPress={() => props.navigation.navigate('Home')}
            />
            <DrawerItem
              label="Profile"
              onPress={() => props.navigation.navigate('Profile')}
            />
            <DrawerItem
              label="Quota"
              onPress={() => props.navigation.navigate('Quota')}
            />

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
                onPress={() => props.navigation.navigate('PaymentOrder')}
              />
              <List.Item
                title="Cancel"
                onPress={() => props.navigation.navigate('ConfirmOrder')}
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
