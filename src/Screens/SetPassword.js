import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import colours from '../colours';

const SetPassword = ({navigation}) => {
  const onPressContinue = () => {
    // Check if both input fields are equal then navigate, else throw error
    // Navigate to HOME screen
    // navigation.navigate('HOME');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Set your password</Text>
      <Text style={styles.infoText}>
        Password must be at least 8 characters long, must contain at least one
        alphabet [A-Za-z] and one number [0-9]
      </Text>
      <View style={styles.inputFieldsView}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter password"
          keyboardType="visible-password"
          secureTextEntry={true}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Re-enter password"
          keyboardType="visible-password"
          secureTextEntry={true}
        />
      </View>
      <View style={styles.viewBottom}>
        <TouchableOpacity onPress={onPressContinue}>
          <View style={styles.btnContinue}>
            <Text style={styles.btnContinueText}>Continue</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.light,
    padding: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colours.brown,
    marginTop: 20,
  },
  infoText: {
    fontSize: 16,
    color: colours.orange,
    marginBottom: 30,
    marginTop: 20,
  },
  inputFieldsView: {
    flex: 1,
    justifyContent: 'center',
  },
  textInput: {
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderBottomWidth: 1.5,
    borderBottomColor: colours.green,
    marginHorizontal: 5,
    height: 50,
  },
  viewBottom: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    marginBottom: 0,
  },
  btnContinue: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colours.green,
  },
  btnContinueText: {
    color: '#fff',
    alignItems: 'center',
  },
});
