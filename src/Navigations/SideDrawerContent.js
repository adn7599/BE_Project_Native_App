import React, {useState} from 'react';
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
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={common.flexOne}>
      <DrawerContentScrollView {...props}>
        <View style={common.flexOne}>
          <View style={{paddingLeft: 20, flexDirection: 'row', marginTop: 20}}>
            <Avatar.Text size={70} label={'AP'} />
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
              expanded={expanded}
              onPress={() => setExpanded(!expanded)}>
              <List.Item
                title="Payment"
                onPress={() => props.navigation.navigate('PaymentOrder')}
              />
              <List.Item
                title="Confirm"
                onPress={() => props.navigation.navigate('ConfirmOrder')}
              />
            </List.Accordion>
            <DrawerItem label="Order History" />
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
