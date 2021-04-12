import React from 'react';
import { Container,Title,Left,Right,Body, Header,Button,Text, Icon} from 'native-base';
import { View,StyleSheet } from 'react-native';
import {Avatar} from 'react-native-paper';

import common from '../Global/stylesheet';

const DATA = [
    {
        id : '1111111111',
        name : 'Ajay Pandit',
        address : 'xxxx',
        ration_no : 'ABC1234567890',
        phone : '1234567890',
        password : 'xxxxxxxxxx',
    },
];

const initial = DATA[0].name.split(' ')[0][0] + DATA[0].name.split(' ')[1][0]

const ProfileScreen = ({navigation}) =>{

    return (
        <Container style={common.container}>
            <Header style ={common.headerColor}>
                <Left>
                    <Icon onPress= {() => navigation.openDrawer()}
                        name= "md-menu"
                        style={common.headerMenuBtn} />
                </Left>
                <Body>
                    <Title style={common.headerText}>
                        Profile
                    </Title>
                </Body>
                <Right />
            </Header>
            <View style={Styles.profileView}>
                <View style={Styles.avatarView}>
                    <Avatar.Text size={150} label ={initial} />
                </View>
            <View style ={Styles.userNameView}>
                <Text style ={common.text}>
                    {DATA[0].name}
                </Text>
            </View>
            <View style={common.topBottomSep}>
                <Text style ={common.text}>
                    Address : 
                </Text>
                <Text style ={common.text}>
                {DATA[0].address}
                </Text>
            </View>
            <View style={common.topBottomSep}>
                <Text style ={common.text}>
                    Ration Number :
                </Text>
                <Text style ={common.text}>
                    {DATA[0].ration_no}
                </Text>
            </View>
            <View style={common.topBottomSep}>
                <Text style ={common.text}>
                    Phone Number :
                </Text>
                <Text style ={common.text}>
                    {DATA[0].phone}
                </Text>
            </View>
            <View style={common.topBottomSep}>
                <Button onPress={() => console.log(initial)}>
                    <Text>
                        Change password
                    </Text>
                </Button>
            </View>
            </View>
        </Container>
    );
}

const Styles = StyleSheet.create({
    profileView : {
        paddingLeft : 40,
    },
    avatarView : {
        alignItems:'center',
        paddingTop:30,
    },
    userNameView : {
        alignItems:'center',
        paddingTop:10,
    },
})

export default ProfileScreen;