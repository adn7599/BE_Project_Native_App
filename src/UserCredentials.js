import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, createContext, useEffect} from 'react';
import {useContext} from 'react/cjs/react.development';
import {
  ActivityIndicator,
  SafeAreaView,
  TimePickerAndroid,
  ToastAndroid,
} from 'react-native';

import common from './Global/stylesheet';
import SplashScreen from './Screens/StartScreens/SplashScreen';
import {getUserDetails} from './serverQueries/User/login';

const USER_CRED_KEY = 'userCredentails';

const SPLASHSCREEN_TIME = 1000;

const userCredContext = createContext();

export const UserCredentials = ({children}) => {
  const [userCred, setUserCred] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [timePassed, setTimePassed] = useState(false);

  const loadUserCred = async () => {
    try {
      const storedUserCreds = await AsyncStorage.getItem(USER_CRED_KEY);
      if (storedUserCreds !== null) {
        const parsedStoredUserCreds = JSON.parse(storedUserCreds);
        console.log('User credentials found', parsedStoredUserCreds);
        console.log('ttp token found: ', parsedStoredUserCreds.ttpToken);
        //Need to fetch user details
        const [detErr, detResp] = await getUserDetails(
          parsedStoredUserCreds.ttpToken,
        );

        if (detErr === null) {
          if (detResp.status == 200) {
            setUserDetails(detResp.data);
            //converting data to JSON before loading state
            setUserCred(parsedStoredUserCreds);
            setIsLoaded(true);
          } else if (detResp.status == 403) {
            //token is invalid
            ToastAndroid.show('Token expired\nLogin again', ToastAndroid.LONG);
            await deleteUserCred();
            setIsLoaded(true);
          } else {
            ToastAndroid.show(detResp.data.error, ToastAndroid.LONG);
          }
        } else {
          ToastAndroid.show(detErr.message, ToastAndroid.LONG);
        }
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
      //Need to fetch user details
      const [detErr, detResp] = await getUserDetails(ttpToken);

      if (detErr === null) {
        if (detResp.status == 200) {
          setUserDetails(detResp.data);
          await AsyncStorage.setItem(
            USER_CRED_KEY,
            JSON.stringify(storedUserCreds),
          );
          setUserCred(storedUserCreds);
        } else if (detResp.status == 403) {
          //token is invalid
          ToastAndroid.show('Token expired\nLogin again', ToastAndroid.LONG);
        } else {
          ToastAndroid.show(detResp.data.error, ToastAndroid.LONG);
        }
      } else {
        ToastAndroid.show(detErr.message, ToastAndroid.LONG);
      }
      console.log('Logged in as user : ', storedUserCreds);
    } catch (err) {
      console.log('Error while saving user credentials');
      console.error(err, err.lineNumber, err.columnNumber);
    }
  };

  const deleteUserCred = async () => {
    try {
      await AsyncStorage.removeItem(USER_CRED_KEY);
      setUserCred(null);
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
        value={{userCred, userDetails, saveUserCred, deleteUserCred}}>
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
