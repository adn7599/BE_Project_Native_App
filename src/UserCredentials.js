import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, createContext} from 'react';

const USER_CRED_KEY = 'userCredentails';

const userCredContext = createContext();

const UserCredentials = ({Children}) => {
  const [userCred, setUserCred] = useState(null);

  const loadUserCred = async () => {
    try {
      const storedUserCreds = await AsyncStorage.getItem(USER_CRED_KEY);
      if (storedUserCreds !== null) {
        console.log('User credentials found');
        //converting data to JSON before loading state
        setUserCred(JSON.parse(storedUserCreds));
        console.log('User logged in: ', userCred);
      } else {
        console.log('User credentials not found');
      }
    } catch (err) {
      console.log('Error while loading stored user credentials');
      console.error(err);
    }
  };

  const saveUserCred = async (role, reg_id, relayToken, ttpToken) => {
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
    loadUserCreds();
  }, []);

  return;
  <userCredContext.Provider value={(userCred, saveUserCred, deleteUserCred)}>
    <Children />
  </userCredContext.Provider>;
};
