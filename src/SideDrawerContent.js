import React from 'react';
import {View} from 'react-native';
import {DrawerContent, DrawerContentScrollView,DrawerItem} from '@react-navigation/drawer';
import {Icon,Text, Title} from 'native-base';
import {Avatar, Drawer} from 'react-native-paper';
import common from './Global/stylesheet';

const SideDrawerContent = (props) => {
    return(
        <View style={common.flexOne}>
            <DrawerContentScrollView {...props}>
                <View style = {common.flexOne}>
                    <View style= {{paddingLeft : 20,flexDirection :'row',marginTop : 20}}>
                        <Avatar.Text size ={70} label ={'AP'}/>
                        <View style ={{margin : 15,}}>
                            <Text>Ajay Pandit</Text>
                            <Text note>1111111111</Text>
                        </View>
                    </View>
                    <Drawer.Section style ={{marginTop : 15}}>
                        <DrawerItem 
                        label = 'Home'
                        onPress ={() => props.navigation.navigate('CustomerDashboard')}
                        />
                        <DrawerItem 
                        label = 'Profile'
                        onPress ={() => props.navigation.navigate('Profile')}
                        />
                        <DrawerItem 
                        label = 'Quota'
                        onPress ={() => props.navigation.navigate('Quota')}
                        />
                        <DrawerItem 
                        label = 'Your Order'
                        onPress ={() => props.navigation.navigate('YourOrder')}
                        />
                        <DrawerItem 
                        label = 'Order History'
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section>
                <DrawerItem
                icon ={({color,size}) =>(
                    <Icon
                    name = 'md-exit-outline'
                    color = {color}
                    size = {size}
                    />
                )}
                label = 'Sign Out'
                />
            </Drawer.Section>
        </View>
    )
}

export default SideDrawerContent;