import React,{useState}  from 'react';
import { 
    Container,Card,Title,
    CardItem,Left,Right,
    Body,Content, Header,
    Icon,Button,Text,
    Tabs,Tab,}
    from 'native-base';
import { FlatList, View,TouchableOpacity,StyleSheet } from 'react-native';
import { BottomNavigation} from 'react-native-paper';
import PaymentTab from './PaymentTab';
import ConfirmTab from './ConfirmTab';

import common from '../../Global/stylesheet';

const PaymentRoute = ({navigation}) => <PaymentTab navigation = {navigation}/>

const ConfirmRoute = () => <ConfirmTab />

const OrderScreen = ({navigation}) =>{

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'payment', title: 'Payment'},
        { key: 'confirm', title: 'confirm'},
    ]);

    const renderScene = BottomNavigation.SceneMap({
        payment : PaymentRoute,
        confirm : ConfirmRoute,
    });
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
                      Your Order
                  </Title>
              </Body>
          </Header>
        <Header style={common.welcomeHeader}>
            <Body>
            <Text style={common.welcomeHeaderText}>Welcome User</Text>
            </Body>
            <Right />
        </Header>
        <View style ={common.topBottomSep}></View>
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
      </Container>
    );
}

export default OrderScreen;