import React, {useEffect, useState, useContext} from 'react';
import {View, StyleSheet, SafeAreaView, Dimensions} from 'react-native';
import {Avatar, Appbar, Button, Text, Menu, Divider} from 'react-native-paper';
import {myProfileContext} from '../../Navigations/MyProfileStack';
import common from '../../Global/stylesheet';
import useUserCred from '../../UserCredentials';

const ProfileScreen = ({navigation}) => {
  const {userDetails, deleteUserCred, userCred} = useUserCred();
  const {avatarText, name} = useContext(myProfileContext);
  return (
    <SafeAreaView style={{flex: 1}}>
      <Appbar.Header>
        <Appbar.Action
          size={33}
          icon="menu"
          onPress={() => navigation.openDrawer()}
        />
        <Appbar.Content title="Profile" />
        <Appbar.Action 
        icon = 'clock-alert-outline'
        onPress = {() => {}} 
        />
      </Appbar.Header>
      <View style={{paddingHorizontal: 30}}>
        <View style={Styles.avatarView}>
          <Avatar.Text size={150} label={avatarText} />
        </View>
        <View style={Styles.userNameView}>
          <Text style={common.text}>{name}</Text>
        </View>
        <View style={{marginTop: 15}}>
          <Text style={{fontSize: 18}}>Address </Text>
          <Text style={common.text}>{userDetails.address}</Text>
        </View>
        {userCred.role !== 'customer' ? (
          <View style={{marginTop: 15}}>
            <Text style={common.text}>Region </Text>
            <Text style={common.text}>{userDetails.region}</Text>
          </View>
        ) : (
          <></>
        )}
        <View style={{marginTop: 15}}>
          <Text style={common.text}>
            {userCred.role === 'customer'
              ? `Ration Number `
              : `Registration ID `}
          </Text>
          <Text style={common.text}>{userDetails._id}</Text>
        </View>
        <View style={{marginTop: 15}}>
          <Text style={common.text}>Phone Number </Text>
          <Text style={common.text}>{userDetails.mobNo}</Text>
        </View>
        <View style={{marginTop: 15}}>
          <Button
            onPress={() => {
              navigation.navigate('ChangePassword');
            }}
            mode="contained">
            Change password
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  profileView: {
    paddingLeft: 40,
  },
  avatarView: {
    alignItems: 'center',
    paddingTop: 30,
  },
  userNameView: {
    alignItems: 'center',
    paddingTop: 10,
  },
});

export default ProfileScreen;
