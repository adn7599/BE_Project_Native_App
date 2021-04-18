import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{useState, createContext,useEffect} from 'react';
import { useContext } from 'react/cjs/react.development';
import {ActivityIndicator, SafeAreaView} from 'react-native';

import common from './Global/stylesheet';

const USER_CRED_KEY = 'userCredentails';

const userCredContext = createContext();

export const UserCredentials = ({children}) => {
  const [userCred, setUserCred] = useState(null);
  const [isLoaded,setIsLoaded] = useState(false);

  const loadUserCred = async () => {
    try {
      const storedUserCreds = await AsyncStorage.getItem(USER_CRED_KEY);
      if (storedUserCreds !== null) {
        console.log('User credentials found');
        //converting data to JSON before loading state
        setUserCred(JSON.parse(storedUserCreds));
        setIsLoaded(true);
        console.log('User logged in: ', userCred);
      } else {
        console.log('User credentials not found');
      }
    } catch (err) {
      console.log('Error while loading stored user credentials');
      console.error(err);
    }
  };

  const saveUserCred = async (role, reg_id, ttpToken,relayToken,) => {
    try {
      const storedUserCreds = {
        role,
        reg_id,
        relayToken,
        ttpToken,
      };
      setUserCred(storedUserCreds);
      await AsyncStorage.setItem(
        USER_CRED_KEY,
        JSON.stringify(storedUserCreds),
      );
    } catch (err) {
      console.log('Error while saving user credentials');
      console.error(err);
    }
  };

  const deleteUserCred = async () => {
    try {
      setUserCred(storedUserCreds);
      setUserCred(null);
      await AsyncStorage.removeItem(USER_CRED_KEY);
    } catch (err) {
      console.log('Error while saving user credentials');
      console.error(err);
    }
  };

  useEffect(() => {
    loadUserCred();
  }, []);

  if(isLoaded){
  return(
  <userCredContext.Provider value={{userCred, saveUserCred, deleteUserCred}}>
    {children }
  </userCredContext.Provider>
  )
  }
  else{
    return(
      <SafeAreaView style ={[common.container,common.flexOne,{justifyContent : 'center'}]}>
        <ActivityIndicator size ={'large'} color ={'#2F070D'} />
      </SafeAreaView>
    )
  }

};

const useUserCred = () => {
  return useContext(userCredContext);
}

export default useUserCred;