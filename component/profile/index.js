import React from 'react';
import { Container,Title,Left,Right,Body, Header,Button,Text, Icon} from 'native-base';
import { View,StyleSheet } from 'react-native';
import {Avatar} from 'react-native-paper';

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
      <Container style={{backgroundColor:'#F9D1A3'}}>
          <Header style ={{backgroundColor:'white'}}>
              <Left>
                  <Icon onPress= {() => navigation.openDrawer()}
                    name= "md-menu"
                    style={{fontSize: 35, color: 'red'}} />
              </Left>
              <Body>
                  <Title style={{color:'black',paddingLeft:100}}>
                      Profile
                  </Title>
              </Body>
              <Right />
          </Header>
          <View style={{paddingLeft:40}}>
              <View style={{alignItems:'center',paddingTop:30}}>
            <Avatar.Text size={150} label ={initial} />
            </View>
          <View style ={{alignItems:'center',paddingTop:10}}>
              <Text style ={styles.content}>
                  {DATA[0].name}
              </Text>
          </View>
          <View style={{paddingTop:30}}>
              <Text style ={styles.content}>
                  Address : 
              </Text>
              <Text style ={styles.content}>
              {DATA[0].address}
              </Text>
          </View>
          <View style={{paddingTop:20}}>
              <Text style ={styles.content}>
                  Ration Number :
              </Text>
              <Text style ={styles.content}>
                  {DATA[0].ration_no}
              </Text>
          </View>
          <View style={{paddingTop:20}}>
              <Text style ={styles.content}>
                  Phone Number :
              </Text>
              <Text style ={styles.content}>
                  {DATA[0].phone}
              </Text>
          </View>
          <View style={{paddingTop:20}}>
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

const styles = StyleSheet.create({
    content :{
        fontSize : 20,   
    }
})

export default ProfileScreen;