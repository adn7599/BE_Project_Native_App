import React, {useEffect, useState} from 'react';
import {
  Container,
  Title,
  Left,
  Right,
  Body,
  Header,
  Button,
  Text,
  Icon,
} from 'native-base';
import {View, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-paper';

import common from '../Global/stylesheet';
import useUserCred from '../UserCredentials';

const ProfileScreen = ({route, navigation}) => {
  const {userDetails, deleteUserCred, userCred} = useUserCred();
  const {avatarText, name} = route.params;

  return (
    <Container style={common.container}>
      <Header style={common.headerColor}>
        <Left>
          <Icon
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            style={common.headerMenuBtn}
          />
        </Left>
        <Body>
          <Title style={common.headerText}>Profile</Title>
        </Body>
        <Right />
      </Header>
      <View style={Styles.profileView}>
        <View style={Styles.avatarView}>
          <Avatar.Text size={150} label={avatarText} />
        </View>
        <View style={Styles.userNameView}>
          <Text style={common.text}>{name}</Text>
        </View>
        <View style={common.topBottomSep}>
          <Text style={common.text}>Address :</Text>
          <Text style={common.text}>{userDetails.address}</Text>
        </View>
        {userCred.role !== 'customer' ? (
          <View style={common.topBottomSep}>
            <Text style={common.text}>Region :</Text>
            <Text style={common.text}>{userDetails.region}</Text>
          </View>
        ) : (
          <></>
        )}
        <View style={common.topBottomSep}>
          <Text style={common.text}>
            {userCred.role === 'customer'
              ? `Ration Number :`
              : `Registration ID : `}
          </Text>
          <Text style={common.text}>{userDetails._id}</Text>
        </View>
        <View style={common.topBottomSep}>
          <Text style={common.text}>Phone Number :</Text>
          <Text style={common.text}>{userDetails.mobNo}</Text>
        </View>
        <View style={common.topBottomSep}>
          <Button onPress={() => {}}>
            <Text>Change password</Text>
          </Button>
        </View>
      </View>
    </Container>
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
