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

  const CustomerDrawerContent = () => {
    return (
      <>
        <List.AccordionGroup>
          <List.Item
            title="Home"
            onPress={() => props.navigation.navigate('RequesterDashboard1')}
          />
          <List.Accordion title="Your Order" id="YOurOrder">
            <List.Item
              title="Payment"
              onPress={() => {
                props.navigation.navigate('RequesterPayment');
              }}
            />
            <List.Item
              title="Confirm"
              onPress={() => {
                props.navigation.navigate('RequesterConfirm');
              }}
            />
          </List.Accordion>
          <List.Accordion title="Order History" id="OrderHistory">
            <List.Item
              title="completed"
              onPress={() =>
                props.navigation.navigate('RequesterConfirmedOrderHistory')
              }
            />
            <List.Item
              title="Cancel"
              onPress={() =>
                props.navigation.navigate('RequesterCancelledOrderHistory')
              }
            />
          </List.Accordion>
        </List.AccordionGroup>
      </>
    );
  };

  const SupplierDrawerContent = () => {
    return (
      <>
        <List.AccordionGroup>
          <List.Item
            title="Home"
            onPress={() => props.navigation.navigate('ProviderDashboard')}
          />
          <List.Item
            title="Stock"
            onPress={() => {
              props.navigation.navigate('ProviderStock');
            }}
          />
          <List.Accordion title="Order History" id="OrderHistory">
            <List.Item
              title="Completed"
              onPress={() => {
                props.navigation.navigate('ProviderConfirmedOrderHistory');
              }}
            />
            <List.Item
              title="Cancelled"
              onPress={() => {
                props.navigation.navigate('ProviderCancelledOrderHistory');
              }}
            />
          </List.Accordion>

          <List.Accordion
            title="Request Commodities"
            id="RequestCommodities"
            style={{backgroundColor: 'grey'}}>
            <List.AccordionGroup>
              <List.Item
                title="Make Request"
                onPress={() => props.navigation.navigate('RequesterDashboard')}
              />
              <List.Accordion title="Your Order" id="YourOrders">
                <List.Item
                  title="Payment"
                  onPress={() => {
                    props.navigation.navigate('RequesterPayment');
                  }}
                />
                <List.Item
                  title="Confirm"
                  onPress={() => {
                    props.navigation.navigate('RequesterConfirm');
                  }}
                />
              </List.Accordion>
              <List.Accordion title="Order History" id="OrderHistory">
                <List.Item
                  title="completed"
                  onPress={() =>
                    props.navigation.navigate('RequesterConfirmedOrderHistory')
                  }
                />
                <List.Item
                  title="Cancel"
                  onPress={() =>
                    props.navigation.navigate('RequesterCancelledOrderHistory')
                  }
                />
              </List.Accordion>
            </List.AccordionGroup>
          </List.Accordion>
        </List.AccordionGroup>
      </>
    );
  };

  const DistributorDrawerContent = () => {
    return (
      <>
        <List.Item
          title="Home"
          onPress={() => props.navigation.navigate('ProviderDashboard')}
        />
        <List.Item
          title="Stock"
          onPress={() => {
            props.navigation.navigate('ProviderStock');
          }}
        />
        <List.Item
          title="Complete History"
          onPress={() => {
            props.navigation.navigate('ProviderConfirmedOrderHistory');
          }}
        />
        <List.Item
          title="Cancel History"
          onPress={() => {
            props.navigation.navigate('ProviderCancelledOrderHistory');
          }}
        />
      </>
    );
  };

  let SelectedDrawerContent;

  if (userCred.role === 'customer') {
    SelectedDrawerContent = CustomerDrawerContent;
  } else if (userCred.role === 'SP') {
    SelectedDrawerContent = SupplierDrawerContent;
  } else {
    SelectedDrawerContent = DistributorDrawerContent;
  }

  const avatarText =
    userCred.role === 'customer'
      ? userDetails.fName[0] + userDetails.lName[0]
      : userDetails.name.substring(0, 2).toUpperCase();

  const name =
    userCred.role === 'customer'
      ? userDetails.fName + ' ' + userDetails.lName
      : userDetails.name;

  return (
    <View style={common.flexOne}>
      <DrawerContentScrollView {...props}>
        <View style={common.flexOne}>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('MyProfile', {
                avatarText: avatarText,
                name: name,
              })
            }>
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
            <SelectedDrawerContent />
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
