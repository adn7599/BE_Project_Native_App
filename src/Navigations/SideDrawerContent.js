import React, {useState, useEffect} from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {
  DrawerContent,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {Icon, Text, Title} from 'native-base';
import {
  Avatar,
  Divider,
  Drawer,
  List,
  TouchableRipple,
} from 'react-native-paper';
import common from '../Global/stylesheet';

import useUserCred from '../UserCredentials';

const roleTitle = {
  customer: 'Customer',
  SP: 'Supplier',
  DA: 'Distributor',
};

const SideDrawerContent = (props) => {
  const {userCred, userDetails, deleteUserCred} = useUserCred();
  const [active, setActive] = React.useState('Home');

  const CustomerDrawerContent = () => {
    return (
      <>
        <Drawer.Section style={{marginTop: 15}}>
          <Drawer.Item
            label="Home"
            icon="home"
            active={active === 'Home'}
            onPress={() => {
              setActive('Home');
              props.navigation.navigate('RequesterHome');
            }}
          />
        </Drawer.Section>
        <Drawer.Section title="Your Orders">
          <Drawer.Item
            label="Pending payments"
            icon="cash"
            active={active === 'Pending payments'}
            onPress={() => {
              setActive('Pending payments');
              props.navigation.navigate('RequesterPayment');
            }}
            style={styles.drawerFirstChild}
          />
          <Drawer.Item
            label="Pending confirmations"
            icon="format-list-checks"
            active={active === 'Pending confirmation'}
            onPress={() => {
              setActive('Pending confirmation');
              props.navigation.navigate('RequesterConfirm');
            }}
            style={styles.drawerFirstChild}
          />
        </Drawer.Section>
        <Drawer.Section title="Order History">
          <Drawer.Item
            label="Completed orders"
            icon="check-all"
            active={active === 'Completed orders'}
            onPress={() => {
              setActive('Completed orders');
              props.navigation.navigate('RequesterConfirmedOrderHistory');
            }}
            style={styles.drawerFirstChild}
          />
          <Drawer.Item
            label="Cancelled orders"
            icon="cancel"
            active={active === 'Cancelled orders'}
            onPress={() => {
              setActive('Cancelled orders');
              props.navigation.navigate('RequesterCancelledOrderHistory');
            }}
            style={styles.drawerFirstChild}
          />
        </Drawer.Section>
      </>
    );
  };

  const SupplierDrawerContent = () => {
    return (
      <>
        <Drawer.Section style={{marginTop: 15}}>
          <Drawer.Item
            label="Home"
            icon="home"
            active={active === 'Home'}
            onPress={() => {
              setActive('Home');
              props.navigation.navigate('ProviderHome');
            }}
          />
          <Drawer.Item
            label="Stock"
            icon="silo"
            active={active === 'Stock'}
            onPress={() => {
              setActive('Stock');
              props.navigation.navigate('ProviderStock');
            }}
          />
        </Drawer.Section>
        <Drawer.Section title="Customer Order History">
          <Drawer.Item
            label="Completed Orders"
            icon="check-all"
            active={active === 'Completed Orders'}
            onPress={() => {
              setActive('Completed Orders');
              props.navigation.navigate('ProviderConfirmedOrderHistory');
            }}
            style={styles.drawerFirstChild}
          />
          <Drawer.Item
            label="Cancelled Orders"
            icon="cancel"
            active={active === 'Cancelled Orders'}
            onPress={() => {
              setActive('Cancelled Orders');
              props.navigation.navigate('ProviderCancelledOrderHistory');
            }}
            style={styles.drawerFirstChild}
          />
        </Drawer.Section>
        <Drawer.Section title="Restock">
          <Drawer.Item
            label="Place restock request"
            icon="restore"
            active={active === 'Restock'}
            onPress={() => {
              setActive('Restock');
              props.navigation.navigate('RequesterDashboard');
            }}
            style={styles.drawerFirstChild}
          />
          <Drawer.Item
            label="Pending payments"
            icon="cash"
            active={active === 'Pending payments'}
            onPress={() => {
              setActive('Pending payments');
              props.navigation.navigate('RequesterPayment');
            }}
            style={styles.drawerFirstChild}
          />
          <Drawer.Item
            label="Pending confirmations"
            icon="format-list-checks"
            active={active === 'Pending confirmations'}
            onPress={() => {
              setActive('Pending confirmations');
              props.navigation.navigate('RequesterConfirm');
            }}
            style={styles.drawerFirstChild}
          />
          <Drawer.Item
            label="Completed requests"
            icon="check-all"
            active={active === 'Completed requests'}
            onPress={() => {
              setActive('Completed requests');
              props.navigation.navigate('RequesterConfirmedOrderHistory');
            }}
            style={styles.drawerFirstChild}
          />
          <Drawer.Item
            label="Cancelled requests"
            icon="cancel"
            active={active === 'Cancelled requests'}
            onPress={() => {
              setActive('Cancelled requests');
              props.navigation.navigate('RequesterCancelledOrderHistory');
            }}
            style={styles.drawerFirstChild}
          />
        </Drawer.Section>
      </>
    );
  };

  const DistributorDrawerContent = () => {
    return (
      <>
        <Drawer.Section style={{marginTop: 15}}>
          <Drawer.Item
            label="Home"
            icon="home"
            active={active === 'Home'}
            onPress={() => {
              setActive('Home');
              props.navigation.navigate('ProviderDashboard');
            }}
          />
          <Drawer.Item
            label="Stock"
            icon="silo"
            active={active === 'Stock'}
            onPress={() => {
              setActive('Stock');
              props.navigation.navigate('ProviderStock');
            }}
          />
        </Drawer.Section>
        <Drawer.Section title="Order History">
          <Drawer.Item
            label="Completed Orders"
            icon="check-all"
            active={active === 'Completed Orders'}
            onPress={() => {
              setActive('Completed Orders');
              props.navigation.navigate('ProviderConfirmedOrderHistory');
            }}
            style={styles.drawerFirstChild}
          />
          <Drawer.Item
            label="Cancelled Orders"
            icon="cancel"
            active={active === 'Cancelled Orders'}
            onPress={() => {
              setActive('Cancelled Orders');
              props.navigation.navigate('ProviderCancelledOrderHistory');
            }}
            style={styles.drawerFirstChild}
          />
        </Drawer.Section>
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
        <View>
          <TouchableRipple
            onPress={() => {
              console.log('avatar text', avatarText, name);
              props.navigation.navigate('MyProfile', {
                avatarText: avatarText,
                name: name,
              });
            }}>
            <Drawer.Section
              style={{
                paddingLeft: 20,
                flexDirection: 'row',
                marginTop: 20,
                justifyContent: 'space-around',
              }}>
              <Avatar.Text size={70} label={avatarText} color="white" />
              <View style={{margin: 10}}>
                <Text>{name}</Text>
                <Text note>{userDetails._id}</Text>
                <Text note>{roleTitle[userCred.role]}</Text>
              </View>
            </Drawer.Section>
          </TouchableRipple>
          <Divider />
          <SelectedDrawerContent />
        </View>
      </DrawerContentScrollView>
      <Divider />
      <Drawer.Section>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="md-exit-outline" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => {
            deleteUserCred();
          }}
        />
      </Drawer.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerFirstChild: {
    paddingLeft: 10,
  },
});

export default SideDrawerContent;
