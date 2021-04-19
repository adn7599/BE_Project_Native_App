import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, createContext, useEffect} from 'react';
import {useContext} from 'react/cjs/react.development';
import {ActivityIndicator, SafeAreaView, TimePickerAndroid} from 'react-native';

import common from './Global/stylesheet';
import SplashScreen from './Screens/StartScreens/SplashScreen';

const USER_CRED_KEY = 'userCredentails';

const SPLASHSCREEN_TIME = 1000;

const userCredContext = createContext();

export const UserCredentials = ({children}) => {
  const [userCred, setUserCred] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [timePassed, setTimePassed] = useState(false);

  const loadUserCred = async () => {
    try {
      const storedUserCreds = await AsyncStorage.getItem(USER_CRED_KEY);
      if (storedUserCreds !== null) {
        console.log('User credentials found');
        //converting data to JSON before loading state
        setUserCred(JSON.parse(storedUserCreds));
        console.log('User logged in: ', userCred);
        setIsLoaded(true);
      } else {
        console.log('User credentials not found');
        setIsLoaded(true);
      }
    } catch (err) {
      console.log('Error while loading stored user credentials');
      console.error(err);
    }
  };

  const saveUserCred = async (role, reg_id, ttpToken, relayToken) => {
    try {
      const storedUserCreds = {
        role,
        reg_id,
        relayToken,
        ttpToken,
      };
      await AsyncStorage.setItem(
        USER_CRED_KEY,
        JSON.stringify(storedUserCreds),
      );
      setUserCred(storedUserCreds);
      console.log('Logged in as user : ', storedUserCreds);
    } catch (err) {
      console.log('Error while saving user credentials');
      console.error(err);
    }
  };

  const deleteUserCred = async () => {
    try {
      setUserCred(null);
      await AsyncStorage.removeItem(USER_CRED_KEY);
    } catch (err) {
      console.log('Error while saving user credentials');
      console.error(err);
    }
  };

  useEffect(() => {
    loadUserCred();
    setTimeout(
      () => {
        setTimePassed(true);
      },
      //return (navigation.navigate('CustomerDashboard')) },
      SPLASHSCREEN_TIME,
    );
  }, []);

  if (isLoaded && timePassed) {
    return (
      <userCredContext.Provider
        value={{userCred, saveUserCred, deleteUserCred}}>
        {children}
      </userCredContext.Provider>
    );
  } else {
    return <SplashScreen timePassed={timePassed} />;
  }
};

const useUserCred = () => {
  return useContext(userCredContext);
};

export default useUserCred;
