/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import SplashScreen from './src/Screens/StartScreens/SplashScreen';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => SplashScreen);
