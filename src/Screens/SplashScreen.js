import React, {useState, useEffect} from 'react';
import {Image, Text, StyleSheet, SafeAreaView} from 'react-native';
import colours from '../colours';
import App from '../App';

const logo = require('../Assets/Logo.png');

const SplashScreen = ({navigation}) => {
  const [timePassed, setTimePassed] = useState(false);

  useEffect(() => {
    setTimeout(
      () => {
        setTimePassed({timePassed: true});
      },
      //return (navigation.navigate('CustomerDashboard')) },
      2000,
    );
  }, []);

  if (timePassed) {
    return <App />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>Commodity Distribution System</Text>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colours.light,
  },
  logo: {
    width: 132,
    height: 152,
    paddingBottom: 20,
  },
  title: {
    color: colours.brown,
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SplashScreen;
