import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import Customer from '../Assets/svgComponents/Customer';
import Supplier from '../Assets/svgComponents/Supplier';
import Distributor from '../Assets/svgComponents/Distributor';

import colours from '../colours';

const MyButton = ({title, colour}) => {
  return (
    <TouchableOpacity style={[styles.button, {backgroundColor: colour}]}>
      <Text style={styles.btText}>{title}</Text>
    </TouchableOpacity>
  );
};

const WhoAreYou = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        
        <View style={{flex: 1, padding: 10}}>
            <Text style={styles.text}>
                Who are{'\n'}
                you?
            </Text>    
        </View> 

        <View style={[styles.innerContainer]}>
            <Customer style={{flex: 1}} width={140}/>
            <MyButton style={{flex: 1}} title="Customer" colour={colours.yellow} />
        </View>

        <View style={styles.innerContainer}>
            <MyButton style={{flex: 1}} title="Supplier" colour={colours.orange} />
            <Supplier style={{flex: 1}} width={130}/>
        </View> 
        
        <View style={styles.innerContainer}>
            <Distributor style={{flex: 1}} width={130}/>
            <MyButton style={{flex: 1 }} title="Distributor" colour={colours.green} />
        </View> 

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.light,
    alignItems: 'flex-start',
    padding: 15,
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    width: 320,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 60,
    borderRadius: 30,
  },
  btText: {
    fontSize: 20,
    fontFamily: 'Roboto-Regular',
    fontWeight: 'bold',
    color: 'white',
  },
  text: {
    flex: 1,
    alignSelf: 'flex-start',
    fontSize: 43,
    color: colours.brown,
    fontFamily: 'Roboto-Regular',
    fontWeight: 'bold',
  },
});

export default WhoAreYou;
